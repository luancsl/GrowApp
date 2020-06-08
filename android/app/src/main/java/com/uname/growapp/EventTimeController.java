package com.uname.growapp;

import android.content.Intent;
import android.os.Bundle;
import androidx.annotation.Nullable;
import android.widget.Toast;
import android.content.Context;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.bridge.WritableMap;

public class EventTimeController extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Context context = getApplicationContext();
        HeadlessJsTaskService.acquireWakeLockNow(context);

        Bundle extras = intent.getExtras();

        WritableMap data = extras != null ? Arguments.fromBundle(extras) : Arguments.createMap();

        return new HeadlessJsTaskConfig("timeController", data, 0, true);
    }
}