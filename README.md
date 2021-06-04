# @okhi/react-native-core

Core package for the OkHi react native suite of libraries

## Installation

```sh
npm install @okhi/react-native-core
```

## Usage

```js
import {
  isGooglePlayServicesAvailable,
  isLocationPermissionGranted,
  isLocationServicesEnabled,
  requestEnableGooglePlayServices,
  requestEnableLocationServices,
  requestLocationPermission,
  isBackgroundLocationPermissionGranted,
  requestBackgroundLocationPermission,
} from '@okhi/react-native-core';

async function checkPermissions() {
  if (!(await isGooglePlayServicesAvailable())) {
    await requestEnableGooglePlayServices(); // resolves true | false
  }

  if (!(await isLocationPermissionGranted())) {
    await requestLocationPermission(); // resolves true | false
  }

  if (!(await isLocationServicesEnabled())) {
    await requestEnableLocationServices(); // resolves true | false
  }

  if (!(await isBackgroundLocationPermissionGranted())) {
    await requestBackgroundLocationPermission(); // resolves true | false
  }
}
```

## Documentation

- [Guides](https://docs.okhi.co/v/v5.0-alpha/okhi-on-your-react-native-app)

- [Best Practices](https://docs.google.com/document/d/1kxolQJ4n6tEgReuqVLYpDVMW--xvqv5UQ7AdvrN0Uw0)

- [API Reference](https://okhi.github.io/react-native-core/)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
