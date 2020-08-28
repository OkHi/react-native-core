import axios from 'axios';
import type { OkHiAuth } from './OkHiAuth';
import type { OkHiAccessScope } from './types';
import { OkHiMode } from './OkHiMode';
import { OkHiException } from './OkHiException';

const API_VERSION = 'v5';
const ANONYMOUS_SIGN_IN_ENDPOINT = '/auth/anonymous-signin';
const DEV_BASE_URL =
  `https://dev-api.okhi.io/${API_VERSION}` + ANONYMOUS_SIGN_IN_ENDPOINT;
const SANDBOX_BASE_URL =
  `https://sandbox-api.okhi.io/${API_VERSION}` + ANONYMOUS_SIGN_IN_ENDPOINT;
const PROD_BASE_URL =
  `https://api.okhi.io/${API_VERSION}` + ANONYMOUS_SIGN_IN_ENDPOINT;

export class OkHiCore {
  private URL: string;

  constructor(private readonly auth: OkHiAuth) {
    if (auth.getContext().getMode() === 'dev') {
      this.URL = DEV_BASE_URL;
    } else if (auth.getContext().getMode() === OkHiMode.PROD) {
      this.URL = PROD_BASE_URL;
    } else {
      this.URL = SANDBOX_BASE_URL;
    }
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
    console.log(error);
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
