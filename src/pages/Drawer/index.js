import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView,
    Image
} from "react-native";
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements'

const DrawerComponent = (props) => (

    <View>
        <SafeAreaView>
            <View >
                <View style={{ alignItems: 'center' }}>
                    <Avatar
                        size="xlarge"
                        rounded
                        title="MD"
                        showEditButton
                    />
                </View>
            </View>
            <View>
                <DrawerNavigatorItems {...props} />
            </View>
        </SafeAreaView>

    </View>

);

export default DrawerComponent