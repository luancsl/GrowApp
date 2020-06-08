import React, { PureComponent, useState } from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Animated, Easing, FlatList, ActivityIndicator } from "react-native";
import { ListScroll } from "./styled";
import Space from "../space";
import { SharedElement } from 'react-native-motion';
import DataFile from "../data";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "@store/ducks/space";
import { Creators as ConfigActions, Types } from "@store/ducks/config";
import Geolocation from '@react-native-community/geolocation';
import { sia } from "@services";


const animateTitle = new Animated.Value(1);
const animateButton = new Animated.Value(0);
const animateContentTopExpanding = new Animated.Value(150);
const animateContentBottomExpanding = new Animated.Value(50);
const animateContentRadiusTopExpanding = new Animated.Value(60);
const animateContentRadiusBottomExpanding = new Animated.Value(40);

class SpaceList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            opacityOfSelectedItem: 1,
            selectedItem: null,
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
        this.fakeData = DataFile;

        this.sharedElementRefs = {};
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

    _getLocation() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            },
            error => {
            },
            { enableHighAccuracy: false, timeout: 8000, maximumAge: 1000 }
        );
    }

    async _getPet() {
        this.setState({ progress: true });
        const { latitude, longitude, dataIncial, dataFinal } = this.state;
        sia.eto(latitude, longitude, dataIncial, dataFinal, 200).then((resposta) => {
            this.setState({ data: resposta });
            this.setState({ progress: false });
            this.props.navigation.navigate('TakeStep', resposta);
        });
    }

    _updateDate() {
        const date = this._getDate(-8);
        this.setState({ dataIncial: date, dataFinal: date });
    }

    onListItemPressed = item => {
        const { onItemPress } = this.props;
        this.setState({ selectedItem: item });

        onItemPress(item);

        this.sharedElementRefs[item.name].moveToDestination();
    };
    onMoveToDestinationWillStart = () => {
        this.setState({ opacityOfSelectedItem: 0 });
    };
    onMoveToSourceDidFinish = () => {
        this.setState({ opacityOfSelectedItem: 1 });
    };
    getSharedNode = props => {
        const { item } = props;
        return (
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <Space item={item} animateOnDidMount={false} isHidden={false} />
            </View>
        );
    };

    renderItem = ({ item }) => {
        const { opacityOfSelectedItem } = this.state;
        const { selectedItem } = this.props;

        const isHidden = selectedItem && selectedItem.name !== item.name;
        const isSelected = selectedItem && selectedItem.name === item.name;
        const id = item.name;

        return (
            <SharedElement
                easing={Easing.in(Easing.back())}
                ref={node => (this.sharedElementRefs[id] = node)}
                id={id}
                onMoveToDestinationWillStart={this.onMoveToDestinationWillStart}
                onMoveToSourceDidFinish={this.onMoveToSourceDidFinish}
                getNode={this.getSharedNode}
                item={item}
            >
                <View
                    style={{
                        flex: 1,
                        opacity: opacityOfSelectedItem,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Space
                        item={item}
                        onPress={this.onListItemPressed}
                        isHidden={isHidden}
                    />
                </View>
            </SharedElement>
        );
    };

    render() {
        const { opacityOfSelectedItem } = this.state;
        const { selectedItem, phase } = this.props;
        const { spaces, addSpace } = this.props;
        return (
            <Animated.View style={[styles.container, this.props.containerStyle]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20 }}>
                    <Text
                        style={{ fontSize: 25, fontWeight: 'bold', color: '#1118' }}
                    >
                        Locais
                    </Text>
                    <TouchableOpacity
                        style={{ height: 35, width: 75, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', elevation: 2 }}
                        onPress={() => this.props.navigation.navigate('MapView')}
                    >
                        <Text>Ir mapa</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.progress ? <View style={{ backgroundColor: '#1111', height: '100%', justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', zIndex: 60 }}>
                        <View style={{ backgroundColor: '#fff', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 20, height: 180, width: 160, marginBottom: 30 }}>
                            <ActivityIndicator size={60} color="#0000ff" />
                            <Text style={{ fontSize: 15, color: '#1118' }}>Coletando dados...</Text>
                        </View>
                    </View>
                        :
                        null
                }
                <FlatList
                    data={spaces}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    dataExtra={{ phase, opacityOfSelectedItem }}
                    keyExtractor={item => item.name}
                    renderItem={this.renderItem}
                    ListFooterComponent={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20, opacity: this.state.opacityOfSelectedItem }}>
                            <TouchableOpacity
                                style={{ flex: 1, height: 40, width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#fff', elevation: 5 }}
                                onPress={() => this._getPet()}
                            >
                                <View style={{}} >
                                    <Text style={{}} >Adicionar novo local</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </Animated.View>
        );
    }
}

const mapStateToProps = state => ({
    spaces: state.spaceState,
    config: state.configState
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...ConfigActions, ...SpaceActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SpaceList);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 60,
        elevation: 20,
        top: 110,
        bottom: 20,
        left: 10,
        right: 10,
        padding: 20,
        paddingBottom: 15,
        position: 'absolute',
        zIndex: 0,
        overflow: 'hidden',
    },
});
