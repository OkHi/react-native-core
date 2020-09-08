import { encode as btoa } from 'js-base64';
import { OkHiContext } from './OkHiContext';

/**
 * The OkHiAuth class manages your credentials as well as the running context of your application.
 * It is **required** by all other OkHi libraries.
 */
export class OkHiAuth {
  private context: OkHiContext;

  /**
   * @param credentials Your OkHi issued pair of credentials.
   * @param credentials.branchId Your OkHi issued branchId.
   * @param credentials.clientKey Your OkHi issued clientKey.
   */
  constructor(
    private readonly credentials: { branchId: string; clientKey: string }
  ) {
    this.context = OkHiContext.withDefaultContext();
  }

  /**
   * Creates an OkHiAuth object with a pre-defined {@link OkHiContext} context.
   * @param credentials Your OkHi issued pair of credentials.
   * @param credentials.branchId Your OkHi issued branchId.
   * @param credentials.clientKey Your OkHi issued clientKey.
   * @param context Your pre-defined {@link OkHiContext}.
   */
  static withContext(
    credentials: { branchId: string; clientKey: string },
    context: OkHiContext
  ) {
    const auth = new OkHiAuth(credentials);
    auth.setContext(context);
    return auth;
  }

  private setContext(context: OkHiContext) {
    this.context = context;
  }

  /**
   * Returns your currently running OkHiContext.
   */
  getContext(): OkHiContext {
    return this.context;
  }

  /**
   * Returns your generated secret access token.
   */
  getAccessToken() {
    return (
      'Token ' +
      btoa(`${this.credentials.branchId}:${this.credentials.clientKey}`)
    );
  }

  /**
   * Returns your issued branchId.
   */
  getBranchId() {
    return this.credentials.branchId;
  }

  /**
   * Returns your issued clientKey.
   */
  getClientKey() {
    return this.credentials.clientKey;
  }
}
