import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity } from "react-native";


export default (props) => {

    const onChangeDripMinute = (value) => {
        props.onChangeDripMinute ? props.onChangeDripMinute(value) : '';
    }

    const onChangeDripperSpacing = (value) => {
        props.onChangeDripperSpacing ? props.onChangeDripperSpacing(value) : '';
    }

    const onChangeRowWidth = (value) => {
        props.onChangeRowWidth ? props.onChangeRowWidth(value) : '';
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={{ paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 20, color: '#404040', marginBottom: 5 }}>
                    Gotas por minuto (min)
                </Text>
                <TextInput
                    style={{ height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, elevation: 1, marginBottom: 10 }}
                    keyboardType={'numeric'}
                    onChangeText={text => onChangeDripMinute(text)}
                    value={props.dripMinute}
                    placeholder='40'
                />
            </View>

            <View style={{ paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 20, color: '#404040', marginBottom: 5 }}> Espaçamento entre gotejadores (cm)</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, elevation: 1, marginBottom: 10 }}
                    keyboardType={'numeric'}
                    onChangeText={text => onChangeDripperSpacing(text)}
                    value={props.dripperSpacing}
                    placeholder='120'
                />
            </View>

            <View style={{ paddingHorizontal: 25 }}>
                <Text style={{ fontSize: 20, color: '#404040', marginBottom: 5 }}> Largura da linha (cm) </Text>
                <TextInput
                    style={{ height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, elevation: 1 }}
                    keyboardType={'numeric'}
                    onChangeText={text => onChangeRowWidth(text)}
                    value={props.rowWidth}
                    placeholder='80'
                />
            </View>
        </View>
    );

}