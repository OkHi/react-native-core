import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactNativeCore, {
  OkHiContext,
  OkHiMode,
  OkHiAuth,
} from '@okhi/react-native-core';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    ReactNativeCore.multiply(3, 7).then(setResult);
  }, []);

  const context = new OkHiContext({
    mode: OkHiMode.SANDBOX,
    app: {
      name: 'My Demo app',
      version: '1.0.0',
      build: 1,
    },
  });

  const auth = OkHiAuth.withContext(
    {
      branchId: 'xyz',
      clientKey: 'abc',
    },
    context
  );

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>Result: {auth.getAccessToken()}</Text>
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
