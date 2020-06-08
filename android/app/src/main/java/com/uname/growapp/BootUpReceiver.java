package com.uname.growapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootUpReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent Intent) {
        context.startService(new Intent(context, TimeControllerService.class));
    }
}