import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import Map from "react-native-maps";
import { Color } from "@common";
import { sia } from "@services";


class MapView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            title: "ETo",
            description: "carregando",
            latitude: -8.896182,
            longitude: -36.502563,
            dataIncial: "20190516",
            dataFinal: "20190516",
            error: null,
            data: null,
            progress: false,

        }
    }

    componentDidMount() {
        this._updateDate();
        this._getLocation();

    }

    _getDate(atraso) {
        let data = new Date();
        data.setDate(data.getDate() + atraso);
        console.log(data.getMonth());
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        let result = ano + ('0' + mes).slice(-2) + ('0' + dia).slice(-2);
        return result;
    }

    _updateDate() {
        const date = this._getDate(-8);
        this.setState({ dataIncial: date, dataFinal: date });
    }

    _getLocation() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            },
            error => {
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 1000 }
        );
    }

    async _getPet() {
        this.setState({ progress: true });
        const { latitude, longitude, dataIncial, dataFinal } = this.state;
        console.log("data:", dataIncial);
        sia.eto(latitude, longitude, dataIncial, dataFinal, 200).then((resposta) => {
            console.log("DadosEtc:", resposta);
            this.setState({ data: resposta });
            this.setState({ progress: false });
            this.props.navigation.navigate('TakeStep', resposta);
        });

    }

    async _handleLongPress(e) {
        let event = e.nativeEvent;
        await this.setState({ latitude: event.coordinate.latitude, longitude: event.coordinate.longitude });
        this._getPet();

    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25, paddingHorizontal: 40, paddingBottom: 13, position: 'absolute', left: 0, right: 0, zIndex: 20 }}>

                    <TouchableOpacity
                        style={{ height: 40, width: 75, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', elevation: 2 }}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Text style={{ fontSize: 18, color: '#1119' }}>Locais</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.progress ? <View style={{ backgroundColor: '#1111', height: '100%', justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', zIndex: 24 }}>
                        <View style={{ backgroundColor: '#fff', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 20, height: 180, width: 160, marginBottom: 30 }}>
                            <ActivityIndicator size={60} color="#0000ff" />
                            <Text style={{ fontSize: 15, color: '#1118' }}>Coletando dados...</Text>
                        </View>
                    </View>
                        :
                        null
                }
                <Map
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0102,
                        longitudeDelta: 0.0101
                    }}
                    onPress={() => { }}
                    onLongPress={e => { this._handleLongPress(e); }}
                    style={{ height: '110%', top: 0, bottom: 0, left: 0, right: 0 }}
                    rotateEnabled={false}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    showsPointsOfInterest={false}
                    showBuildings={false}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    showsPointsOfInterest={true}
                    showsCompass={true}
                >
                    {
                        <Map.Marker
                            title={"Região"}
                            description={`${this.state.latitude},${
                                this.state.longitude
                                }`}
                            key={this.state.id}
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                        />
                    }
                </Map>
            </View>
        );
    }
}

export default MapView;