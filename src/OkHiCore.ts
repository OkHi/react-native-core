import { NativeModules } from 'react-native';
import axios from 'axios';
import type { ApplicationConfiguration, OkHiAccessScope } from './types';
import { OkHiMode } from './OkHiMode';
import { OkHiException } from './OkHiException';

/**
 * @ignore
 */
type ReactNativeCoreType = {
  getApplicationConfiguration(): Promise<string>;
};

const ReactNativeCore: ReactNativeCoreType = NativeModules.ReactNativeCore;

/**
 * @ignore
 */
export class OkHiCore {
  private readonly API_VERSION = 'v5';
  private readonly ANONYMOUS_SIGN_IN_ENDPOINT = '/auth/anonymous-signin';
  private readonly DEV_BASE_URL =
    `https://dev-api.okhi.io/${this.API_VERSION}` +
    this.ANONYMOUS_SIGN_IN_ENDPOINT;
  private readonly SANDBOX_BASE_URL =
    `https://sandbox-api.okhi.io/${this.API_VERSION}` +
    this.ANONYMOUS_SIGN_IN_ENDPOINT;
  private readonly PROD_BASE_URL =
    `https://api.okhi.io/${this.API_VERSION}` + this.ANONYMOUS_SIGN_IN_ENDPOINT;

  protected getApplicationConfiguration(): Promise<ApplicationConfiguration> {
    return new Promise((resolve, reject) => {
      ReactNativeCore.getApplicationConfiguration()
        .then((config) => resolve(JSON.parse(config)))
        .catch(reject);
    });
  }

  protected anonymousSignInWithPhoneNumber(
    phone: string,
    scopes: Array<OkHiAccessScope>
  ) {
    return this.anonymousSignIn({
      scopes,
      phone,
    });
  }

  protected anonymousSignInWithUserId(
    userId: string,
    scopes: Array<OkHiAccessScope>
  ) {
    return this.anonymousSignIn({
      scopes,
      user_id: userId,
    });
  }

  private async anonymousSignIn(payload: {
    scopes: Array<OkHiAccessScope>;
    [key: string]: any;
  }): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.getApplicationConfiguration()
        .then((applicationConfiguration) => {
          const { auth, context } = applicationConfiguration;
          let url = this.SANDBOX_BASE_URL;
          if (context.mode === 'dev') {
            url = this.DEV_BASE_URL;
          } else if (context.mode === OkHiMode.PROD) {
            url = this.PROD_BASE_URL;
          } else {
            url = this.SANDBOX_BASE_URL;
          }
          const headers = { Authorization: auth.accessToken };
          axios
            .post<{ authorization_token: string }>(url, payload, {
              headers,
            })
            .then(({ data }) => resolve(data.authorization_token))
            .catch((error) => reject(this.parseRequestError(error)));
        })
        .catch(reject);
    });
  }

  private parseRequestError(error: any) {
    if (!error.response) {
      return new OkHiException({
        code: OkHiException.NETWORK_ERROR_CODE,
        message: OkHiException.NETWORK_ERROR_MESSAGE,
      });
    }
    switch (error.response.status) {
      case 400:
        return new OkHiException({
          code: OkHiException.INVALID_PHONE_CODE,
          message: OkHiException.INVALID_PHONE_MESSAGE,
        });
      case 401:
        return new OkHiException({
          code: OkHiException.UNAUTHORIZED_CODE,
          message: OkHiException.UNAUTHORIZED_MESSAGE,
        });
      default:
        return new OkHiException({
          code: OkHiException.UNKNOWN_ERROR_CODE,
          message: error.message || OkHiException.UNKNOWN_ERROR_MESSAGE,
        });
    }
  }
}
