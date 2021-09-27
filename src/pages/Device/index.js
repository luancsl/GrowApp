import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView } from "react-native";
import { Image, Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceList from "./DeviceList";
import Details from "./Details";

const DeviceStack = createStackNavigator();

class Device extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {

    }


    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <DeviceStack.Navigator>
                    <DeviceStack.Screen
                        name='List'
                        options={{ headerTitle: 'Dispositivos' }}
                    >
                        {props => <DeviceList {...props} />}
                    </DeviceStack.Screen>
                    <DeviceStack.Screen
                        name='Details'
                        options={{ headerTitle: 'Detalhes' }}
                        
                    >
                        {props => <Details {...props} />}
                    </DeviceStack.Screen>
                </DeviceStack.Navigator>
            </View>
        );
    }
}

export default Device;