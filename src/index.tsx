import {
  NativeModules,
  Platform,
  PermissionsAndroid,
  Rationale,
} from 'react-native';
import { OkHiException } from './OkHiException';

export * from './types';
export * from './OkHiAuth';
export * from './OkHiContext';
export * from './OkHiException';
export * from './OkHiMode';
export * from './OkHiCore';

type ReactNativeCoreType = {
  isLocationPermissionGranted(): Promise<boolean>;
  isLocationServicesEnabled(): Promise<boolean>;
  isGooglePlayServicesAvailable(): Promise<boolean>;
  openLocationServicesSettings(): Promise<void>;
  requestEnableLocationServices(): Promise<boolean>;
  requestEnableGooglePlayServices(): Promise<boolean>;
};

const ReactNativeCore: ReactNativeCoreType = NativeModules.ReactNativeCore;

export const isLocationPermissionGranted = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.isLocationPermissionGranted()
      .then(resolve)
      .catch((error) =>
        reject(
          new OkHiException({
            code: error.code,
            message: error.message,
          })
        )
      );
  });
};

export const isLocationServicesEnabled = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.isLocationServicesEnabled()
      .then(resolve)
      .catch((error) =>
        reject(
          new OkHiException({
            code: error.code,
            message: error.message,
          })
        )
      );
  });
};

export const isGooglePlayServicesAvailable = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.isGooglePlayServicesAvailable()
      .then(resolve)
      .catch((error) =>
        reject(
          new OkHiException({
            code: error.code,
            message: error.message,
          })
        )
      );
  });
};

export const openLocationServicesSettings = (): Promise<void> => {
  return new Promise((_, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.openLocationServicesSettings();
  });
};

export const requestEnableLocationServices = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.requestEnableLocationServices()
      .then(resolve)
      .catch((error) =>
        reject(
          new OkHiException({
            code: error.code,
            message: error.message,
          })
        )
      );
  });
};

export const requestEnableGooglePlayServices = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    ReactNativeCore.requestEnableGooglePlayServices()
      .then(resolve)
      .catch((error) =>
        reject(
          new OkHiException({
            code: error.code,
            message: error.message,
          })
        )
      );
  });
};

export const requestLocationPermission = (
  rationale: Rationale
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (Platform.OS !== 'android') {
      reject(
        new OkHiException({
          code: OkHiException.UNSUPPORTED_PLATFORM_CODE,
          message: OkHiException.UNSUPPORTED_PLATFORM_MESSAGE,
        })
      );
    }
    const hasPermission = await ReactNativeCore.isLocationPermissionGranted();
    if (hasPermission) {
      return resolve(hasPermission);
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      rationale
    );
    return resolve(granted === PermissionsAndroid.RESULTS.GRANTED);
  });
};
