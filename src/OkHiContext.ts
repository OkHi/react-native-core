import type { OkHiAppContext } from './types';
import { OkHiMode } from './OkHiMode';

/**
 * The OkHiContext class defines your current running context i.e what mode will you be using OkHi seervices.
 * It also keeps track of your apps current version and build numbers which will assit in debigging purposes.
 */
export class OkHiContext {
  /**
   * Takes in a context configuration that defines your applications current {@link OkHiMode} and meta data about your current application.
   * @param {@link OkHiAppContext}
   */
  constructor(private readonly context: OkHiAppContext) {}

  /**
   * Returns a default OkHiContext which points to the SANDBOX mode of OkHi services.
   */
  static withDefaultContext() {
    return new OkHiContext({
      mode: OkHiMode.SANDBOX,
      developer: 'external',
    });
  }

  /**
   * Returns the current mode.
   * @returns "sandbox" | "prod"
   */
  getMode() {
    return this.context.mode;
  }

  /**
   * Returns current metadata information about your application.
   * May be undefined if none is set via the {@link OkHiContext}
   */
  getAppMeta() {
    return this.context.app;
  }

  /**
   * Returns current metadata information about the current developer integrating OkHi services.
   */
  getDeveloper() {
    return this.context.developer === 'okhi' ? 'okhi' : 'external';
  }

  /**
   * Returns current metadata information about the current running platform.
   */
  getPlatform() {
    return 'react-native';
  }
}
