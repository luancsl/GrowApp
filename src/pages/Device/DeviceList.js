import React, { Component, PureComponent } from "react";
import { View, Text, ProgressBarAndroid, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView } from "react-native";
const { LanScan } = NativeModules;
import { PermissionsAndroid } from 'react-native';
import { Image, Button, Icon } from 'react-native-elements';
import { DeviceApi, WifiApi } from "@services";

class DeviceList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            json: [],
            refreshing: true,
            jsonWifi: [],
            teste: '',
            isConnecting: true,
            isconnected: false,

        }

    }


    componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'É necessária permissão de localização para conexões WiFi',
                message: 'Este aplicativo precisa de permissão de localização, pois isso é necessário para procurar redes wifi.',
                buttonNegative: 'Negar',
                buttonPositive: 'Permitir',
            },
        );
        DeviceApi.scanLocalDevices().then(resposta => {
            this.setState({ json: [] });
            this.setState({ json: resposta, refreshing: false });
        });

        DeviceApi.scanWifiDevices().then(resposta => {
            this.setState({ jsonWifi: [] });
            this.setState({ jsonWifi: resposta });
        });

        this._unsubscribe2 = this.props.navigation.addListener('focus', () => {
            setTimeout(() => {
                this._onRefresh();
            }, 3000);
        });
    }

    componentWillReceiveProps(nextProps) {
        this._onRefresh();
    }

    _onPressDevices() {
        this.setState({ refreshing: true });
        LanScan.scanSubNet('192.168.0.', 100, 200).then(
            wifiList => {
                this.setState({ json: [] });
                let wifiArray = JSON.parse(wifiList);
                console.log('Ss:', wifiArray);
                const select = wifiArray.filter((value) => {

                    return DeviceApi.isDevice(value.mac);
                });
                this.setState({ json: select, refreshing: false });

            }
        );
    }

    _getSignalRSSIToPorcent(value) {
        return (2 * ((value > -50 ? -50 : value) + 100));
    }

    _getSignalIcon(value) {
        if (DeviceApi.checkRSSIStrengthQuality(value, 'excellent')) {
            return (
                <Icon
                    name='wifi-strength-4'
                    type='material-community'
                    size={15}
                    color='#228B22'
                />
            );
        } else if (DeviceApi.checkRSSIStrengthQuality(value, 'good')) {
            return (
                <Icon
                    name='wifi-strength-3'
                    type='material-community'
                    size={15}
                    color='#517fa4'
                />
            );
        } else if (DeviceApi.checkRSSIStrengthQuality(value, 'fair')) {
            return (
                <Icon
                    name='wifi-strength-2'
                    type='material-community'
                    size={15}
                    color='#ffd500'
                />
            );
        } else if (DeviceApi.checkRSSIStrengthQuality(value, 'weak')) {
            return (
                <Icon
                    name='wifi-strength-1'
                    type='material-community'
                    size={15}
                    color='#ff3232'
                />
            );
        } else {
            return null
        }
    }

    _onRefresh() {

        console.log('refres');
        this.setState({ refreshing: true });
        DeviceApi.scanLocalDevices().then(resposta => {
            this.setState({ json: [] });
            this.setState({ json: resposta, refreshing: false });
        });

        DeviceApi.scanWifiDevices().then(resposta => {
            this.setState({ jsonWifi: [] });
            this.setState({ jsonWifi: resposta });
        });
    }

    _teste() {
        if (this.state.isconnected) {
            WifiApi.disconnectAndRemove().then(resposta => {
                this.setState({ isconnected: false });
                console.log('Resposta disconnect', resposta);
                alert('Resposta disconnect: ' + resposta);
            }).catch(erro => {
                console.log('Error:', erro);
            });

        } else {
            WifiApi.connectToProtectedSSID('ESP-6AB817', 'growDev*!#').then(resposta => {
                this.setState({ teste: resposta, isconnected: true });
                console.log('Resposta connect', resposta);
                alert('Resposta connect: ' + resposta);
            }).catch(erro => {
                console.log('Error:', erro);
            });
        }


    }
    _openLocalDevice(value) {
        WifiApi.getCurrentWifiSSID().then(resposta => {
            const data = {
                item: {
                    name: DeviceApi.getWifiName(value.mac),
                    ip: value.host,
                    BSSID: value.mac,
                    RSSI: value.rssi,
                },
                currentWifiSSID: resposta,
                localType: true
            }
            this.props.navigation.navigate('Details', data);
        });

    }
    _openExternalDevice(value) {
        WifiApi.getCurrentWifiSSID().then(resposta => {
            const data = {
                item: {
                    name: DeviceApi.getWifiName(value.BSSID),
                    ip: '192.168.4.1',
                    BSSID: value.BSSID,
                    RSSI: value.level,
                },
                ssidDevice: value.SSID,
                passDevice: 'growDev*!#',
                currentWifiSSID: resposta,
                localType: false
            }
            this.props.navigation.navigate('Details', data);
        });
    }

    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Dispositivos conectados a rede</Text>
                    <FlatList
                        data={this.state.json}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this._openLocalDevice(item)} style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginHorizontal: 10, marginVertical: 5, marginRight: 40, borderRadius: 12, elevation: 5 }}>
                                <View style={{ flex: 0.2, marginRight: 2 }}>
                                    <Image
                                        source={require('@assets/device01.png')}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </View>
                                <View style={{ flex: .8 }} >
                                    <Text>{DeviceApi.getWifiName(item.mac)}</Text>
                                    <Text>{item.mac}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>Sinal {DeviceApi.rssiToPorcent(item.rssi)}% </Text>
                                        {this._getSignalIcon(item.rssi)}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.host}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Dispositivos fora da Rede</Text>
                    <FlatList
                        data={this.state.jsonWifi}
                        keyExtractor={item => item.SSID}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this._openExternalDevice(item)} style={{ backgroundColor: '#fff', padding: 10, paddingBottom: 0, marginHorizontal: 10, marginVertical: 5, marginRight: 40, borderRadius: 12, elevation: 5 }}>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                                    <View style={{ flex: 0.2, marginRight: 2 }}>
                                        <Image
                                            source={require('@assets/device01.png')}
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <Text>{item.SSID.replace(/ESP/, 'GROWCONN')}</Text>
                                        <Text>{item.BSSID}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>Sinal {DeviceApi.rssiToPorcent(item.level)}% </Text>
                                            {this._getSignalIcon(item.level)}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }

                    />
                </ScrollView>

            </View>
        );
    }
}

export default DeviceList;