package com.growapp;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import javax.annotation.Nonnull;

public class TimeControllerModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "TimeController";
    private static ReactApplicationContext reactContext;

    public TimeControllerModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
        this.reactContext.startService(new Intent(this.reactContext, TimeControllerService.class));
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, TimeControllerService.class));
    }

    @ReactMethod
    public void prin(Callback successCallback) {
        String a = "Yes";
        successCallback.invoke(null, a);
    }

}