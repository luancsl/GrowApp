package com.uname.growapp;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.net.NetworkRequest;
import android.net.Uri;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.io.IOException;
import android.os.Build;
import android.provider.Settings;
import android.content.BroadcastReceiver;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import javax.annotation.Nonnull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresPermission;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import android.util.Log;
import java.lang.Thread;

public class LanScanModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "LanScan";
    private final ReactApplicationContext context;
    private final WifiManager wifi;

    public LanScanModule(@Nonnull ReactApplicationContext context) {
        super(context);
        this.context = context;
        wifi = (WifiManager) context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void prin(Callback successCallback) {
        String a = "Yes";
        successCallback.invoke(null, a);
    }

    @ReactMethod
    public void loadWifiList(Callback successCallback, Callback errorCallback) {
        try {
            List<ScanResult> results = wifi.getScanResults();
            JSONArray wifiArray = new JSONArray();

            for (ScanResult result : results) {
                JSONObject wifiObject = new JSONObject();
                if (!result.SSID.equals("")) {
                    try {
                        wifiObject.put("SSID", result.SSID);
                        wifiObject.put("BSSID", result.BSSID);
                        wifiObject.put("capabilities", result.capabilities);
                        wifiObject.put("frequency", result.frequency);
                        wifiObject.put("level", result.level);
                        wifiObject.put("timestamp", result.timestamp);
                    } catch (JSONException e) {
                        errorCallback.invoke(e.getMessage());
                    }
                    wifiArray.put(wifiObject);
                }
            }
            successCallback.invoke(wifiArray.toString());
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void scanSubNet(String subnet, int start, int end, Promise promise) {

        new Thread(new Runnable() {
            @Override
            public void run() {

                JSONArray hostsArray = new JSONArray();
                int countInative = 0;
                /* InetAddress inetAddress = null; */
                for (int i = start; i < end; i++) {
                    Log.d("MyActivity", "Trying: " + subnet + String.valueOf(i));
                    if (countInative > 4) {
                        break;
                    }
                    try {
                        String addr = subnet + String.valueOf(i);
                        /* inetAddress = InetAddress.getByName(addr); */
                        /* NetworkTool.ping(addr) */
                        if (InetAddress.getByName(addr).isReachable(250)) {
                            countInative = 0;
                            JSONObject hostObject = new JSONObject();
                            hostObject.put("host", addr);
                            Log.d("MyActivity", addr);

                            String mac = NetworkTool.getHardwareAddress(addr);

                            hostObject.put("mac", mac);
                            Log.d("MyActivity", mac);
                            hostsArray.put(hostObject);

                        } else {
                            countInative += 1;
                        }
                    } catch (Exception e) {
                        promise.reject("JSONError", e);
                    }
                }

                promise.resolve(hostsArray.toString());
            }
        }).start();

    }

    @ReactMethod
    public void scanWifi(Promise promise) {
        WifiReceiver receiverWifi = new WifiReceiver(wifi, promise);
        getReactApplicationContext().registerReceiver(receiverWifi,
                new IntentFilter(wifi.SCAN_RESULTS_AVAILABLE_ACTION));
        wifi.startScan();
        Log.d("MyActivity", "Scanning WiFi ...");
    }

    class WifiReceiver extends BroadcastReceiver {

        private final Promise promise;
        private final WifiManager wifi;

        public WifiReceiver(final WifiManager wifi, Promise promise) {
            super();
            this.promise = promise;
            this.wifi = wifi;
            Log.d("MyActivity", "Entrou broadcast");
        }

        // This method call when number of wifi connections changed
        public void onReceive(Context c, Intent intent) {
            c.unregisterReceiver(this);
            try {
                List<ScanResult> results = this.wifi.getScanResults();
                JSONArray wifiArray = new JSONArray();

                for (ScanResult result : results) {
                    JSONObject wifiObject = new JSONObject();
                    if (!result.SSID.equals("")) {
                        try {
                            wifiObject.put("SSID", result.SSID);
                            wifiObject.put("BSSID", result.BSSID);
                            wifiObject.put("capabilities", result.capabilities);
                            wifiObject.put("frequency", result.frequency);
                            wifiObject.put("level", result.level);
                            wifiObject.put("timestamp", result.timestamp);
                        } catch (JSONException e) {
                            this.promise.reject(e.getMessage());
                            return;
                        }
                        Log.d("MyActivity", result.SSID);
                        Log.d("MyActivity", "Novo wifi");
                        wifiArray.put(wifiObject);
                    }
                }
                this.promise.resolve(wifiArray.toString());
            } catch (IllegalViewOperationException e) {
                this.promise.reject(e.getMessage());
            }
        }
    }

}