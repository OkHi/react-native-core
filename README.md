# @okhi/react-native-core

Core package for the OkHi react native suite of libraries

## Installation

```sh
npm install @okhi/react-native-core
```

## Usage

```js
import {
  OkHiContext,
  OkHiMode,
  OkHiAuth,
  isGooglePlayServicesAvailable,
  isLocationPermissionGranted,
  isLocationServicesEnabled,
  requestEnableGooglePlayServices,
  requestEnableLocationServices,
  requestLocationPermission,
} from '@okhi/react-native-core';

// define context first
const context = new OkHiContext({
  mode: OkHiMode.SANDBOX,
  app: {
    name: 'My Demo app',
    version: '1.0.0',
    build: 1,
  },
});

// create auth with or without context. Use the auth object with either OkVerify or OkCollect libraries
const auth = OkHiAuth.withContext(
  {
    branchId: '<my_branch_id>',
    clientKey: '<my_clientKey_id>',
  },
  context
);

async function checkPermissions() {
  if (!(await isGooglePlayServicesAvailable())) {
    await requestEnableGooglePlayServices(); // resolves true | false
  }

  if (!(await isLocationPermissionGranted())) {
    await requestLocationPermission({
      buttonPositive: 'GRANT',
      buttonNegative: 'DENY',
      buttonNeutral: 'CANCEL',
      title: 'Location permission required',
      message:
        'OkHi needs your location permission to create and cerify your address',
    }); // resolves true | false
  }

  if (!(await isLocationServicesEnabled())) {
    await requestEnableLocationServices(); // resolves true | false
  }
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
