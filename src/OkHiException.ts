import type { OkHiError } from './types';

export class OkHiException extends Error {
  static NETWORK_ERROR_CODE = 'network_error';
  static NETWORK_ERROR_MESSAGE =
    'Unable to establish a connection with OkHi servers';
  static UNKNOWN_ERROR_CODE = 'unknown_error';
  static UNKNOWN_ERROR_MESSAGE =
    'Unable to process the request. Something went wrong';
  static INVALID_PHONE_CODE = 'invalid_phone';
  static INVALID_PHONE_MESSAGE =
    'Invalid phone number provided. Please make sure its in MSISDN standard format';
  static UNAUTHORIZED_CODE = 'unauthorized';
  static UNAUTHORIZED_MESSAGE = 'Invalid credentials provided';
  static PERMISSION_DENIED_CODE = 'permission_denied';
  static SERVICE_UNAVAILABLE_CODE = 'service_unavailable';
  static UNSUPPORTED_PLATFORM_CODE = 'unsupported_platform';
  static UNSUPPORTED_PLATFORM_MESSAGE =
    'OkHi methods currently support Android devices only';
  static BAD_REQUEST_CODE = 'bad_request';
  static BAD_REQUEST_MESSAGE = 'Invalid parameters provided';

  code: string;
  constructor(error: OkHiError) {
    super(error.message);
    this.name = 'OkHiException';
    this.message = error.message;
    this.code = error.code;
  }
}
