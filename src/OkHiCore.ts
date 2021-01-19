import axios from 'axios';
import type { OkHiAuth } from './OkHiAuth';
import type { OkHiAccessScope } from './types';
import { OkHiMode } from './OkHiMode';
import { OkHiException } from './OkHiException';
import { ErrorTracking } from './';

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
  private URL: string;

  constructor(private readonly auth: OkHiAuth) {
    if (auth.getContext().getMode() === 'dev') {
      this.URL = this.DEV_BASE_URL;
    } else if (auth.getContext().getMode() === OkHiMode.PROD) {
      this.URL = this.PROD_BASE_URL;
    } else {
      this.URL = this.SANDBOX_BASE_URL;
    }
    ErrorTracking.setExceptionEnv(auth.getContext().getMode());
  }

  protected anonymousSignInWithPhoneNumber(
    phone: string,
    scopes: Array<OkHiAccessScope>
  ) {
    ErrorTracking.setExceptionUser({ phone });
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
      const headers = { Authorization: this.auth.getAccessToken() };
      axios
        .post<{ authorization_token: string }>(this.URL, payload, {
          headers,
        })
        .then(({ data }) => resolve(data.authorization_token))
        .catch((error) => reject(this.parseRequestError(error)));
    });
  }

  private parseRequestError(error: any) {
    if (!error.response) {
      ErrorTracking.captureException(
        OkHiException.NETWORK_ERROR_CODE,
        OkHiException.NETWORK_ERROR_MESSAGE
      );
      return new OkHiException({
        code: OkHiException.NETWORK_ERROR_CODE,
        message: OkHiException.NETWORK_ERROR_MESSAGE,
      });
    }
    ErrorTracking.captureException(
      `Status: ${error.response.status}`,
      JSON.stringify(error.response.body)
    );
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
