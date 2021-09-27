import { NativeModules } from "react-native";
const { LanScan } = NativeModules;

export default class Wifi {


    static scanLocalNet() {
        return (
            LanScan.scanSubNet('192.168.0.', 100, 200).then(
                wifiList => {
                    return JSON.parse(wifiList);
                }
            )
        );
    }

    static scanWifi() {
        return (
            LanScan.scanWifi().then(
                wifilist => {
                    return JSON.parse(wifilist);
                }
            )
        );
    }

    static connectToProtectedSSID(ssid, pswd, wep = false) {
        return LanScan.getCurrentWifiSSID().then(resposta => {
            if (resposta === ssid) {
                return true
            } else {
                return LanScan.connectToProtectedSSID(ssid, pswd, wep).then(resposta => {
                    alert("s: " + ssid + " p: " + pswd)
                    if (resposta === 'connected') {
                        alert("connect");
                        return true
                    }
                    const erro = new Error(resposta);
                    erro.name = 'intern'
                    throw erro;
                }).catch(err => {
                    alert('err: ' + err);
                });
            }
        });

    }

    static isRemoveWifiNetwork(ssid) {
        return LanScan.isRemoveWifiNetwork(ssid);
    }

    static connectionStatus() {
        return LanScan.connectionStatus();
    }

    static disconnect() {
        return LanScan.disconnect();
    }

    static disconnectAndRemove() {
        return LanScan.getCurrentWifiSSID().then(resposta => {
            return LanScan.isRemoveWifiNetwork(resposta).then(resposta => alert("resDis " + resposta)).catch(err => alert('errDis ' + err));
        }).catch(erro => {
        });

    }

    static removeCurrentWifi() {
        return LanScan.removeCurrentWifi().then(resposta => {
            return resposta;
        }).catch(erro => {
        });

    }

    static getCurrentWifiSSID() {
        return (
            LanScan.getCurrentWifiSSID().then(resposta => {
                return resposta;
            })
        );
    }

    static getCurrentWifiBSSID() {
        return LanScan.getBSSID();
    }

    static getCurrentSignalStrength() {
        return LanScan.getCurrentSignalStrength();
    }

    static getIP() {
        return LanScan.getIP();
    }

    static forceWifiUsage() {
        return (LanScan.forceWifiUsage());
    }

    static isEnabled() {
        return LanScan.isEnabled();
    }

    static setEnabled(set = true) {
        return LanScan.setEnabled(set);
    }

    static



}