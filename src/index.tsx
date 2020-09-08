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

/**
 * @ignore
 */
type ReactNativeCoreType = {
  isLocationPermissionGranted(): Promise<boolean>;
  isLocationServicesEnabled(): Promise<boolean>;
  isGooglePlayServicesAvailable(): Promise<boolean>;
  openLocationServicesSettings(): Promise<void>;
  requestEnableLocationServices(): Promise<boolean>;
  requestEnableGooglePlayServices(): Promise<boolean>;
};

/**
 * @ignore
 */
const ReactNativeCore: ReactNativeCoreType = NativeModules.ReactNativeCore;

/**
 * Checks whether location permission is granted.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the permission is granted.
 */
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

/**
 * Checks whether location services are available and turned on.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
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

/**
 * Checks whether Google Play Service is available and turned on.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
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

/**
 * Launches the user's devices location settings, enabling them to turn on location services.
 * @return {Promise<void>}
 */
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

/**
 * Displays an in app native modal, that prompts the user to enable location services.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
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

/**
 * Launches the device's Google Play Services settings, prompting the user to enable the service.
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the service is available.
 */
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

/**
 * Requests location permission from the user.
 * Uses a rationale object to check with the OS whether it is necessary to show a dialog explaining why the permission is needed.
 * See: https://reactnative.dev/docs/permissionsandroid#request
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating whether or not the the permission is granted.
 */
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
