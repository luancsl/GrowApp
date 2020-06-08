import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Image, Button } from 'react-native-elements';
import { material, systemWeights } from 'react-native-typography';



export default (props) => {

    const onSelectionType = (value) => {
        props.onSelection ? props.onSelection(value) : '';
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 23, paddingVertical: 20, justifyContent: 'center' }}>
            <TouchableOpacity style={{ flex: .3, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFFF', marginBottom: 20, elevation: 6 }} onPress={() => onSelectionType('drip')}>
                <View style={{ flex: .30, padding: 5 }}>
                    <Image
                        source={require('@assets/drip-irrigation-icon.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <View style={{ flex: .70, paddingLeft: 10, paddingTop: 5, borderRightWidth: 2, borderColor: '#9999' }}>
                    <Text style={[material.body1]}> Irrigação por Gotejamento</Text>
                    <Text style={[material.caption]}> descrição...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: .3, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#FFFF', marginBottom: 20, elevation: 6 }} onPress={() => onSelectionType('sprinkler')}>
                <View style={{ flex: .30, padding: 5 }}>
                    <Image
                        source={require('@assets/sprinkler-irrigation-icon.png')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <View style={{ flex: .70, paddingLeft: 10, paddingTop: 5, borderRightWidth: 2, borderColor: '#9999' }}>
                    <Text style={[material.body1]}> Irrigação por Aspersão</Text>
                    <Text style={[material.caption]}> descrição...</Text>
                </View>
            </TouchableOpacity>


        </View>
    );

}