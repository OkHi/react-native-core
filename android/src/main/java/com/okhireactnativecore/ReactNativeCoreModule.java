package com.okhireactnativecore;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.okhi.android_core.OkHi;
import io.okhi.android_core.interfaces.OkHiRequestHandler;
import io.okhi.android_core.models.OkHiCoreUtil;
import io.okhi.android_core.models.OkHiException;
import io.okhi.android_core.models.OkHiUser;

public class ReactNativeCoreModule extends ReactContextBaseJavaModule {

  OkHi okHi;

  public ReactNativeCoreModule(ReactApplicationContext reactContext) {
    super(reactContext);
    ActivityEventListener activityEventListener = new ActivityEventListener() {
      @Override
      public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (okHi != null) {
          okHi.onActivityResult(requestCode, resultCode, data);
        }
      }
      @Override
      public void onNewIntent(Intent intent) {

      }
    };
    reactContext.addActivityEventListener(activityEventListener);
  }

  class RequestHandler implements OkHiRequestHandler<Boolean> {

    Promise promise;

    RequestHandler(Promise promise) {
      this.promise = promise;
    }

    @Override
    public void onResult(Boolean result) {
      promise.resolve(result);
    }

    @Override
    public void onError(OkHiException exception) {
      promise.reject(exception);
    }
  }

  @NonNull
  @Override
  public String getName() {
    return "ReactNativeCore";
  }

  @ReactMethod
  public void isLocationPermissionGranted(Promise promise) {
    promise.resolve(OkHi.isLocationPermissionGranted(getReactApplicationContext()));
  }

  @ReactMethod
  public void isLocationServicesEnabled(Promise promise) {
    promise.resolve(OkHi.isLocationServicesEnabled(getReactApplicationContext()));
  }

  @ReactMethod
  public void isGooglePlayServicesAvailable(Promise promise) {
    promise.resolve(OkHi.isGooglePlayServicesAvailable(getReactApplicationContext()));
  }

  @ReactMethod
  public void openLocationServicesSettings() {
    if (getCurrentActivity() != null) {
      OkHi.openLocationServicesSettings(getCurrentActivity());
    }
  }

  @ReactMethod
  public void requestEnableLocationServices(Promise promise) {
    if (OkHi.isLocationServicesEnabled(getReactApplicationContext())) {
      promise.resolve(true);
    } else if (getCurrentActivity() == null) {
      promise.reject(new OkHiException(OkHiException.UNKNOWN_ERROR_CODE, "Main activity hasn't loaded yet"));
    } else {
      okHi = new OkHi(getCurrentActivity());
      okHi.requestEnableLocationServices(new RequestHandler(promise));
    }
  }

  @ReactMethod
  public void requestEnableGooglePlayServices(Promise promise) {
    if (OkHi.isGooglePlayServicesAvailable(getReactApplicationContext())) {
      promise.resolve(true);
    } else if (getCurrentActivity() == null) {
      promise.reject(new OkHiException(OkHiException.UNKNOWN_ERROR_CODE, "Main activity hasn't loaded yet"));
    } else {
      okHi = new OkHi(getCurrentActivity());
      okHi.requestEnableGooglePlayServices(new RequestHandler(promise));
    }
  }

  @ReactMethod
  public void getSDKVersion (Promise promise) {
    promise.resolve(android.os.Build.VERSION.SDK_INT);
  }

  @ReactMethod
  public void captureException(String code, String message) {
    OkHiCoreUtil.captureException(new OkHiException(code, message));
  }

  @ReactMethod
  public void setExceptionUser(String phone, String firstName, String lastName, String userId) {
    OkHiUser user = new OkHiUser.Builder(phone).withFirstName(firstName).withLastName(lastName).withOkHiUserId(userId).build();
    OkHiCoreUtil.setUserException(user);
  }

  @ReactMethod
  public void setExceptionUser(String phone, String firstName, String lastName) {
    OkHiUser user = new OkHiUser.Builder(phone).withFirstName(firstName).withLastName(lastName).build();
    OkHiCoreUtil.setUserException(user);
  }

  @ReactMethod
  public void setExceptionUser(String phone) {
    OkHiCoreUtil.setUserException(phone);
  }
}
