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

import com.uname.growapp.errors.IsRemoveWifiNetworkErrorCodes;
import com.uname.growapp.errors.LoadWifiListErrorCodes;
import com.uname.growapp.utils.LocationUtils;
import com.uname.growapp.utils.PermissionUtils;
import com.thanosfisherman.wifiutils.WifiUtils;
import com.thanosfisherman.wifiutils.wifiConnect.ConnectionErrorCode;
import com.thanosfisherman.wifiutils.wifiConnect.ConnectionSuccessListener;

import androidx.annotation.NonNull;
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

    public LanScanModule(@NonNull ReactApplicationContext context) {
        super(context);
        this.context = context;
        wifi = (WifiManager) context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
    }

    public enum IsEnabledErrorCodes {
        couldNotGetWifiManager,
    }

    public enum ForceWifiUsageErrorCodes {
        couldNotGetConnectivityManager,
    }

    @NonNull
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

    @ReactMethod
    public void forceWifiUsage(final boolean useWifi, final Promise promise) {
        final ConnectivityManager connectivityManager = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);

        if (connectivityManager == null) {
            promise.reject(ForceWifiUsageErrorCodes.couldNotGetConnectivityManager.toString(),
                    "Failed to get the ConnectivityManager.");
            return;
        }

        if (useWifi) {
            NetworkRequest networkRequest = new NetworkRequest.Builder()
                    .addTransportType(NetworkCapabilities.TRANSPORT_WIFI).build();
            connectivityManager.requestNetwork(networkRequest, new ConnectivityManager.NetworkCallback() {
                @Override
                public void onAvailable(@NonNull final Network network) {
                    super.onAvailable(network);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        connectivityManager.bindProcessToNetwork(network);
                    } else {
                        ConnectivityManager.setProcessDefaultNetwork(network);
                    }

                    connectivityManager.unregisterNetworkCallback(this);

                    promise.resolve(null);
                }
            });
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                connectivityManager.bindProcessToNetwork(null);
            } else {
                ConnectivityManager.setProcessDefaultNetwork(null);
            }

            promise.resolve(null);
        }
    }

    @ReactMethod
    public void isEnabled(final Promise promise) {
        if (this.wifi == null) {
            promise.reject(IsEnabledErrorCodes.couldNotGetWifiManager.toString(),
                    "Failed to initialize the WifiManager.");
            return;
        }

        promise.resolve(wifi.isWifiEnabled());
    }

    @ReactMethod
    public void setEnabled(final boolean enabled) {
        wifi.setWifiEnabled(enabled);
    }

    @ReactMethod
    public void connectToProtectedSSID(@NonNull final String SSID, @NonNull final String password, final boolean isWep,
            final Promise promise) {
        final boolean locationPermissionGranted = PermissionUtils.isLocationPermissionGranted(context);
        if (!locationPermissionGranted) {
            promise.reject("location permission missing", "Location permission (ACCESS_FINE_LOCATION) is not granted");
            return;
        }

        final boolean isLocationOn = LocationUtils.isLocationOn(context);
        if (!isLocationOn) {
            promise.reject("location off", "Location service is turned off");
            return;
        }

        WifiUtils.withContext(context).connectWith(SSID, password).setTimeout(60000)
                .onConnectionResult(new ConnectionSuccessListener() {
                    @Override
                    public void success() {
                        promise.resolve("connected");
                    }

                    @Override
                    public void failed(@NonNull ConnectionErrorCode errorCode) {
                        promise.reject("failed", errorCode.toString());
                    }
                }).start();
    }

    @ReactMethod
    public void connectionStatus(final Promise promise) {
        final ConnectivityManager connectivityManager = (ConnectivityManager) getReactApplicationContext()
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager == null) {
            promise.resolve(false);
            return;
        }

        NetworkInfo wifiInfo = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        if (wifiInfo == null) {
            promise.resolve(false);
            return;
        }

        promise.resolve(wifiInfo.isConnected());
    }

    @ReactMethod
    public void disconnect() {
        wifi.disconnect();
    }

    @ReactMethod
    public void getBSSID(final Promise promise) {
        final WifiInfo info = wifi.getConnectionInfo();
        final String bssid = info.getBSSID();
        promise.resolve(bssid.toUpperCase());
    }

    @ReactMethod
    public void getCurrentSignalStrength(final Promise promise) {
        final int linkSpeed = wifi.getConnectionInfo().getRssi();
        promise.resolve(linkSpeed);
    }

    @ReactMethod
    public void getIP(final Promise promise) {
        final WifiInfo info = wifi.getConnectionInfo();
        final String stringIP = longToIP(info.getIpAddress());
        promise.resolve(stringIP);
    }

    @ReactMethod
    public void getCurrentWifiSSID(final Promise promise) {
        WifiInfo info = wifi.getConnectionInfo();

        // This value should be wrapped in double quotes, so we need to unwrap it.
        String ssid = info.getSSID();
        if (ssid.startsWith("\"") && ssid.endsWith("\"")) {
            ssid = ssid.substring(1, ssid.length() - 1);
        }

        promise.resolve(ssid);
    }

    @ReactMethod
    public void isRemoveWifiNetwork(final String SSID, final Promise promise) {
        final boolean locationPermissionGranted = PermissionUtils.isLocationPermissionGranted(context);
        if (!locationPermissionGranted) {
            promise.reject(IsRemoveWifiNetworkErrorCodes.locationPermissionMissing.toString(),
                    "Location permission (ACCESS_FINE_LOCATION) is not granted");
            return;
        }

        final List<WifiConfiguration> mWifiConfigList = wifi.getConfiguredNetworks();
        final String comparableSSID = ('"' + SSID + '"'); // Add quotes because wifiConfig.SSID has them

        for (WifiConfiguration wifiConfig : mWifiConfigList) {
            if (wifiConfig.SSID.equals(comparableSSID)) {
                promise.resolve(wifi.removeNetwork(wifiConfig.networkId));
                wifi.saveConfiguration();
                return;
            }
        }

        promise.resolve(true);
    }

    @ReactMethod
    public void removeCurrentWifi(final Promise promise) {
        final boolean locationPermissionGranted = PermissionUtils.isLocationPermissionGranted(context);
        if (!locationPermissionGranted) {
            promise.reject(IsRemoveWifiNetworkErrorCodes.locationPermissionMissing.toString(),
                    "Location permission (ACCESS_FINE_LOCATION) is not granted");
            return;
        }
        int networkId = wifi.getConnectionInfo().getNetworkId();
        promise.resolve(wifi.removeNetwork(networkId));
        wifi.saveConfiguration();
    }

    private static String longToIP(int longIp) {
        StringBuilder sb = new StringBuilder();
        String[] strip = new String[4];
        strip[3] = String.valueOf((longIp >>> 24));
        strip[2] = String.valueOf((longIp & 0x00FFFFFF) >>> 16);
        strip[1] = String.valueOf((longIp & 0x0000FFFF) >>> 8);
        strip[0] = String.valueOf((longIp & 0x000000FF));
        sb.append(strip[0]);
        sb.append(".");
        sb.append(strip[1]);
        sb.append(".");
        sb.append(strip[2]);
        sb.append(".");
        sb.append(strip[3]);
        return sb.toString();
    }

    private static String formatWithBackslashes(final String value) {
        return String.format("\"%s\"", value);
    }

    /**
     * @return true if the current sdk is above or equal to Android M
     */
    private static boolean isAndroidLollipopOrLater() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M;
    }

    /**
     * @return true if the current sdk is above or equal to Android Q
     */
    private static boolean isAndroid10OrLater() {
        return false; // TODO: Compatibility with Android 10
        // return Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q;
    }

}