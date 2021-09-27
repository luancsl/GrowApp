import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView } from "react-native";
import { Image, Button } from 'react-native-elements';

class Details extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }

    }


    componentDidMount() {

    }


    render() {
        const { item } = this.props.route.params;
        console.log("para", this.props.route.params);
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: .4, margin: 5, borderRadius: 15, elevation: 6, overflow: 'hidden', backgroundColor: '#fff' }}>
                        <Image
                            source={{
                                uri: item.icon,
                            }}
                            resizeMode="cover"
                            style={{ width: 120, height: 130 }}
                        />
                    </View>
                    <View style={{ flex: .6, margin: 8, alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#1116" }}>{item.name.ptBR}</Text>
                        <Text>{item.type ? item.type.ptBR : null}</Text>
                    </View>
                </View>

                <View style={{ flex: 1, padding: 9, margin: 3, marginTop: 20, backgroundColor: '#fff', borderRadius: 6, elevation: 0 }}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold', color: "#1119" }}>Coeficientes da Cultura (Kc)</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 8, marginTop: 15 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: "#1116" }}>Fase de Crescimento Inicial: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#1116" }}>{(item.iniStagekc + "").replace('.', ',')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 8 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: "#1116" }}>Fase de Crescimento Intermediário: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#1116" }}>{(item.midStagekc + "").replace('.', ',')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 8 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: "#1116" }}>Fase de Crescimento Final: </Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#1116" }}>{(item.endStagekc + "").replace('.', ',')}</Text>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

export default Details;