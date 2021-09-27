import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView } from "react-native";
import { Image, Button } from 'react-native-elements';

export default (props) => {
    return (
        <View>
            <TouchableOpacity onPress={() => props.onItemPress(props.item)} style={{ flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginHorizontal: 10, marginVertical: 5, marginRight: 40, borderRadius: 12, elevation: 5 }} >
                <View style={{ flex: 0.23, marginRight: 2, borderRadius: 15, overflow: 'hidden', }}>
                    <Image
                        source={{
                            uri: props.item.icon,
                        }}
                        resizeMode="cover"
                        style={{ width: 70, height: 70 }}
                    />
                </View>
                <View style={{ flex: 0.77, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#1116" }}>{props.item.name.ptBR}</Text>
                    {props.item.type ? <Text>{props.item.type.ptBR}</Text> : null}
                </View>
            </TouchableOpacity>
        </View>
    );
}