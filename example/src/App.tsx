import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
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
import secret, { Core } from './secret';

function signIn() {
  // define context first
  const context = new OkHiContext({
    mode: OkHiMode.SANDBOX,
    app: {
      name: 'My Demo app',
      version: '1.0.0',
      build: 1,
    },
  });
  // create auth with or without context
  const auth = OkHiAuth.withContext(
    {
      branchId: secret.branchId,
      clientKey: secret.clientKey,
    },
    context
  );
  const core = new Core(auth);
  try {
    core.signInWithPhone(secret.phone).then(console.log).catch(console.log);
    core.signInWithUserId(secret.userId).then(console.log).catch(console.log);
  } catch (error) {
    console.log(error);
  }
}

async function checkPermissions() {
  if (!(await isGooglePlayServicesAvailable())) {
    const hasPlayServices = await requestEnableGooglePlayServices();
    console.log('hasPlayServices', hasPlayServices);
  }

  if (!(await isLocationPermissionGranted())) {
    const hasPermission = await requestLocationPermission({
      buttonPositive: 'GRANT',
      buttonNegative: 'DENY',
      buttonNeutral: 'CANCEL',
      title: 'Please grant permissions',
      message: 'We need location permissions',
    });
    console.log('hasPermission', hasPermission);
  }

  if (!(await isLocationServicesEnabled())) {
    const hasLocationServices = await requestEnableLocationServices();
    console.log('hasLocationServices', hasLocationServices);
  }
  console.log('DONE');
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={() => signIn()} />
      <Button title="Check permissions" onPress={() => checkPermissions()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
