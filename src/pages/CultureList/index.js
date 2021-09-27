import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView } from "react-native";
import { Image, Button } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import List from "./List";
import Details from "./Details";

const CultureStack = createStackNavigator();

class CultureList extends PureComponent {
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
                <CultureStack.Navigator>
                    <CultureStack.Screen
                        name='List'
                        options={{ headerTitle: 'Culturas' }}
                    >
                        {props => <List {...props} />}
                    </CultureStack.Screen>
                    <CultureStack.Screen
                        name='Details'
                        options={{ headerTitle: 'Detalhes' }}
                    >
                        {props => <Details {...props} />}
                    </CultureStack.Screen>
                </CultureStack.Navigator>
            </View>
        );
    }
}

export default CultureList;