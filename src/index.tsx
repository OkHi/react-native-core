import { NativeModules } from 'react-native';

type ReactNativeCoreType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ReactNativeCore } = NativeModules;

export * from './types';
export * from './OkHiAuth';
export * from './OkHiContext';
export * from './OkHiException';
export * from './OkHiMode';
export * from './OkHiCore';
export default ReactNativeCore as ReactNativeCoreType;
