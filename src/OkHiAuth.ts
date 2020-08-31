import { encode as btoa } from 'js-base64';
import { OkHiContext } from './OkHiContext';

export class OkHiAuth {
  private context: OkHiContext;

  constructor(
    private readonly credentials: { branchId: string; clientKey: string }
  ) {
    this.context = OkHiContext.withDefaultContext();
  }

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

  getContext() {
    return this.context;
  }

  getAccessToken() {
    return (
      'Token ' +
      btoa(`${this.credentials.branchId}:${this.credentials.clientKey}`)
    );
  }

  getBranchId() {
    return this.credentials.branchId;
  }

  getClientKey() {
    return this.credentials.clientKey;
  }
}
