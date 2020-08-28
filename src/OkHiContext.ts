import type { OkHiAppContext } from './types';
import { OkHiMode } from './OkHiMode';

export class OkHiContext {
  constructor(private readonly context: OkHiAppContext) {}

  static withDefaultContext() {
    return new OkHiContext({
      mode: OkHiMode.SANDBOX,
      developer: 'external',
    });
  }

  getMode() {
    return this.context.mode;
  }

  getAppMeta() {
    return this.context.app;
  }

  getDeveloper() {
    return this.context.developer === 'okhi' ? 'okhi' : 'external';
  }

  getPlatform() {
    return 'react-native';
  }
}
