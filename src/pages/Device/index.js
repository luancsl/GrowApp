import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView } from "react-native";
const { LanScan } = NativeModules;
import { PermissionsAndroid } from 'react-native';
import { Image, Button } from 'react-native-elements';

class Device extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            json: [],
            refreshing: true,
            jsonWifi: []

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
        this.setState({ jsonWifi: [] });
        LanScan.scanSubNet('192.168.0.', 100, 200).then(
            wifiList => {
                let wifiArray = JSON.parse(wifiList);
                console.log('Ss:', wifiArray);
                this.setState({ json: wifiArray, refreshing: false });

            }
        );
        LanScan.scanWifi().then(
            wifilist => {
                let wifiArray = JSON.parse(wifilist);
                console.log('Ss:', wifiArray);
                console.log('dd:', "dd");
                this.setState({ jsonWifi: wifiArray });
            }
        );
    }

    _onPressDevices() {
        this.setState({ refreshing: true });
        LanScan.scanSubNet('192.168.0.', 100, 200).then(
            wifiList => {
                let wifiArray = JSON.parse(wifiList);
                console.log('Ss:', wifiArray);
                this.setState({ json: wifiArray, refreshing: false });

            }
        );
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        LanScan.scanSubNet('192.168.0.', 100, 200).then(
            wifiList => {
                let wifiArray = JSON.parse(wifiList);
                console.log('Ss:', wifiArray);
                this.setState({ json: wifiArray, refreshing: false });

            }
        );
        this.setState({ jsonWifi: [] });
        LanScan.scanWifi().then(
            wifilist => {
                let wifiArray = JSON.parse(wifilist);
                console.log('Ss:', wifiArray);
                console.log('dd:', "dd");
                this.setState({ jsonWifi: wifiArray });
            }
        );
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
                            <View style={{ backgroundColor: '#fff', padding: 10, marginHorizontal: 10, marginVertical: 5, marginRight: 40, borderRadius: 12, elevation: 5 }} >
                                <Text>Host</Text>
                                <Text>{item.host}</Text>
                                <Text>MAC</Text>
                                <Text>{item.mac}</Text>
                            </View>
                        }
                        keyExtractor={item => item.host}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20, paddingLeft: 10 }}> Dispositivos fora da Rede</Text>
                    <FlatList
                        data={this.state.jsonWifi}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginHorizontal: 10, marginVertical: 5, marginRight: 40, borderRadius: 12, elevation: 5 }} >
                                <View style={{ flex: 0.2, marginRight: 2 }}>
                                    <Image
                                        source={require('@assets/device01.png')}
                                        style={{ width: 50, height: 50 }}
                                    />
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Text>SSID</Text>
                                    <Text>{item.SSID}</Text>
                                    <Text>Segurança</Text>
                                    <Text>{item.capabilities.substr(1, 4)}</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text>BSSID</Text>
                                    <Text>{item.BSSID}</Text>
                                    <Text>Sinal</Text>
                                    <Text>{item.level}</Text>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.SSID}
                    />
                </ScrollView>

            </View>
        );
    }
}

export default Device;