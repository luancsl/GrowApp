import React, { Component, PureComponent } from "react";
import { Alert, View, Text, AppState, StyleSheet, Dimensions, ToastAndroid, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView, ActivityIndicator } from "react-native";
import { Image, Button } from 'react-native-elements';
import { DeviceApi, WifiApi } from "@services";
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';

class Details extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            item: {},
            localType: undefined,
            locals: [],
            spaces: [],
            wifi: null,
            ssidDevice: '',
            passDevice: '',
            progress: false,
            currentWifiSSID: '',
            wifiPassInput: '',
            visibleModal: false,
        }
    }


    _disconnect() {
        WifiApi.removeCurrentWifi().then(resposta => {

        }).catch(err => {

        })
    }

    _connect(data) {
        if (data.localType === false) {
            this.setState({ progress: true });
            WifiApi.connectToProtectedSSID(data.ssidDevice, data.passDevice).then(resposta2 => {
                if (resposta2 === true) {
                    this.setState({ progress: false, refreshing: true });
                    setTimeout(() => {
                        DeviceApi.getConfig(data.item.ip).then(resposta => {
                            this.setState({ refreshing: false, locals: resposta.locals, spaces: resposta.spaces });
                        }).catch(err => {
                            this.setState({ refreshing: false })
                        });
                        DeviceApi.getWifiInfo(data.item.ip).then(resposta => {
                            this.setState({ refreshing: false, wifi: resposta });
                        }).catch(err => {
                            this.setState({ refreshing: false })
                        });
                    }, 1000);
                }
            }).catch(err => {
                ToastAndroid.showWithGravityAndOffset(
                    `Não foi possível se conectar a ${data.ssidDevice}!`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    0,
                    50
                );
                this.props.navigation.goBack();
            });
        } else if (data.localType === true) {
            DeviceApi.getConfig(data.item.ip).then(resposta => {
                this.setState({ refreshing: false, locals: resposta.locals, spaces: resposta.spaces });
            }).catch(err => {
                this.setState({ refreshing: false })
            });
            DeviceApi.getWifiInfo(data.item.ip).then(resposta => {
                this.setState({ refreshing: false, wifi: resposta });
            }).catch(err => {
                this.setState({ refreshing: false })
            });
        }
    }


    componentDidMount() {
        const data = this.props.route.params;
        this.setState({ item: data.item, localType: data.localType, currentWifiSSID: data.currentWifiSSID, ssidDevice: data.ssidDevice, passDevice: data.passDevice });

        AppState.addEventListener('change', this.handleAppStateChange);
        this._unsubscribe = this.props.navigation.addListener('blur', () => {
            if (!this.state.localType) {
                this._disconnect();
            }
        });
        this._unsubscribe2 = this.props.navigation.addListener('focus', () => {
            const data = this.props.route.params;
            this._connect(this.state.localType !== undefined ? this.state : data);
        });

    }

    /* componentWillUnmount() {
        this._unsubscribe();
        this._unsubscribe2();
        AppState.removeEventListener('change', this.handleAppStateChange);
    } */

    handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
            if (!this.state.localType) {
                this._disconnect();
            }
        }
        if (nextAppState === 'active') {
            if (!this.state.localType && this.props.navigation.isFocused()) {
                const data = this.props.route.params;
                this._connect(this.state.localType !== undefined ? this.state : data);
            }
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    _onRefresh() {
        this.setState({ refreshing: true });
        DeviceApi.getConfig(this.state.item.ip).then(resposta => {
            this.setState({ refreshing: false, locals: resposta.locals, spaces: resposta.spaces });
        });
        DeviceApi.getWifiInfo(this.state.item.ip).then(resposta => {
            this.setState({ refreshing: false, wifi: resposta });
        });
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

    _localDisconnect(name, addr, ssid) {
        Alert.alert('Alerta', `Tem certeza que deseja desconectar ${name} de ${ssid}?`, [
            {
                text: 'Cancel',
                onPress: () => console.log("cancel"),
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => {
                    DeviceApi.getWifiDisconnect(addr);
                    this.state.localType ? this.props.navigation.goBack() : this._onRefresh();
                }
            }
        ])
    }

    _localConnect(addr, ssid) {
        this.setState({ visibleModal: true });
    }

    _connectLocalNetwork(ssid, pass, addr) {
        this.setState({ visibleModal: false });
        DeviceApi.getWifiConnect(ssid, pass, addr).then(resposta => {
            alert("Conectado");
        }).catch(err => alert('Ocorreu um erro. Tente novamente!'));
    }

    render() {
        const { item, locals, spaces } = this.state;
        console.log("log ", locals);
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Modal
                    useNativeDriver={true}
                    position={'center'}
                    coverScreen={true}
                    isOpen={this.state.visibleModal}
                    onClosed={() => this.setState({ visibleModal: false })}
                    style={{
                        height: 200,
                        width: 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        padding: 10
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: .8 }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Digite a senha para a rede</Text>
                            <View style={{ marginVertical: 15, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20 }}>{this.state.currentWifiSSID}</Text>
                            </View>
                            <TextInput
                                style={{
                                    borderColor: '#1118',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    paddingVertical: 2
                                }}
                                secureTextEntry
                                value={this.state.wifiPassInput}
                                onChangeText={value => this.setState({ wifiPassInput: value })}
                            />
                        </View>
                        <View style={{ flex: .2, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity onPress={() => this.setState({ visibleModal: false })} style={{ height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, padding: 5, elevation: 4 }}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._connectLocalNetwork(this.state.currentWifiSSID, this.state.wifiPassInput, this.state.item.ip)} style={{ height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, padding: 5, elevation: 4 }}>
                                <Text>Conectar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {
                    this.state.progress ? <View style={{ backgroundColor: '#1111', height: '100%', justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', zIndex: 60 }}>
                        <View style={{ backgroundColor: '#fff', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 20, height: 180, width: 160, marginBottom: 30 }}>
                            <ActivityIndicator size={60} color="#0000ff" />
                            <Text style={{ fontSize: 15, color: '#1118' }}>Conectando...</Text>
                        </View>
                    </View>
                        :
                        null
                }

                <View style={{ flexDirection: 'row', borderBottomWidth: .3, padding: 20, borderBottomColor: '#1111' }}>
                    <View style={{ flex: .3, height: 80, margin: 5, borderRadius: 15, elevation: 6, overflow: 'hidden', backgroundColor: '#fff' }}>
                        <Image
                            source={require('@assets/device01.png')}
                            resizeMode="stretch"
                            style={{ width: 90, height: 80 }}
                        />
                    </View>
                    <View style={{ flex: .7, margin: 8, }}>
                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#1116" }}>{item.name}</Text>
                            <Text>{item.BSSID}</Text>
                        </View>
                        <Text>IP: {item.ip}</Text>
                        {
                            this.state.wifi ?
                                this.state.wifi.status === 'connected' ?
                                    <>
                                        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                            <Text>Rede Local: {` ${this.state.wifi.SSID}  ${DeviceApi.rssiToPorcent(this.state.wifi.RSSI)}%`}</Text>
                                            {this._getSignalIcon(this.state.wifi.RSSI)}
                                        </View>
                                        <TouchableOpacity onPress={() => this._localDisconnect(item.name, item.ip, this.state.currentWifiSSID)} style={{ height: 20, width: 85, backgroundColor: '#ff9d9d', alignItems: 'center', borderRadius: 3 }}>
                                            <Text style={{ color: "#fff" }}>Desconectar</Text>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <Text>Rede Local: desconectado</Text>
                                        <TouchableOpacity onPress={() => this._localConnect(item.ip, this.state.currentWifiSSID)} style={{ height: 20, width: 85, backgroundColor: '#99ff99', alignItems: 'center', borderRadius: 3 }}>
                                            <Text style={{ color: "#fff" }}>Conectar</Text>
                                        </TouchableOpacity>
                                    </>

                                :
                                null
                        }

                    </View>
                </View>

                <ScrollView
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                >
                    <View style={{ flex: 1, padding: 20, margin: 3, marginTop: 2, backgroundColor: '#fff', borderRadius: 6, elevation: 0 }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#1119" }}>Espaços Disponíveis</Text>
                            <FlatList
                                style={{ padding: 5 }}
                                horizontal
                                data={locals}
                                keyExtractor={item => item}
                                renderItem={({ item }) =>
                                    <View style={{ height: 58, width: 55, alignItems: 'center', backgroundColor: "#fff", borderColor: '#99ff99', borderWidth: 2, borderRadius: 15, elevation: 5, margin: 7 }}>
                                        <Text style={{ fontSize: 40, color: "#1119", fontWeight: "bold" }}>{item}</Text>
                                    </View>
                                }
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#1119" }}>Espaços Ocupados</Text>
                            <FlatList
                                style={{ padding: 5 }}
                                horizontal
                                data={spaces}
                                keyExtractor={item => item}
                                renderItem={({ item }) =>
                                    <View>
                                        <View style={{ height: 58, width: 55, alignItems: 'center', backgroundColor: '#fff', borderColor: '#ff9d9d', borderWidth: 2, borderRadius: 15, elevation: 5, margin: 7 }}>
                                            <Text style={{ fontSize: 40, color: "#1119", fontWeight: "bold" }}>{item.local}</Text>
                                        </View>
                                        <Text>{item.name}</Text>
                                        <Text>{item.culture}</Text>
                                    </View>
                                }
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Details;