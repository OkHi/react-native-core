package com.okhireactnativecore;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ReactNativeCoreModule extends ReactContextBaseJavaModule {
  public ReactNativeCoreModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "ReactNativeCore";
  }

  @ReactMethod
  public void isLocationPermissionGranted(Promise promise) {
    promise.resolve(true);
  }
}
