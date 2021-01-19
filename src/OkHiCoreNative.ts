import { NativeModules } from 'react-native';

/**
 * @ignore
 */
export type ReactNativeCoreType = {
  isLocationPermissionGranted(): Promise<boolean>;
  isLocationServicesEnabled(): Promise<boolean>;
  isGooglePlayServicesAvailable(): Promise<boolean>;
  openLocationServicesSettings(): Promise<void>;
  requestEnableLocationServices(): Promise<boolean>;
  requestEnableGooglePlayServices(): Promise<boolean>;
  getSDKVersion(): Promise<number>;
  captureException(code: string, message: string): void;
  setExceptionUser(
    phone: string,
    firstName: string,
    lastName: string,
    userId: string
  ): void;
  setExceptionUser(phone: string, firstName: string, lastName: string): void;
  setExceptionUser(phone: string): void;
};

/**
 * @ignore
 */
export const ReactNativeCore: ReactNativeCoreType =
  NativeModules.ReactNativeCore;
