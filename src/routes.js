import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Home, ConfirmPage, KcSelection, KcPhaseSelection, DrawerComponent } from '@pages'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from 'react-native-search-box';

/* const KcSelectionStack = createStackNavigator({
    KcSelection: {
        screen: KcSelection,
        navigationOptions: {
            header: null
        }
    },
    KcPhaseSelection:{
        screen: KcPhaseSelection,
        navigationOptions: {
            header: null
        }
    }
})
 */

const DrawerStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: { header: null }
    },

    KcSelection: {
        screen: KcSelection,
        navigationOptions: { header: null }
    },

    KcPhaseSelection: {
        screen: KcPhaseSelection,
        navigationOptions: { title: null }
    },
    ConfirmPage: {
        screen: ConfirmPage,
        navigationOptions: { title: null }
    }
})

const MainNavigator = createDrawerNavigator(
    {
        Home: DrawerStack,
    },
    {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        contentComponent: DrawerComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',

    });

/* const MainNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        AuthStack,
        MainRoutes: {
            screen: MainRoutes,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#0ff',
                },
                headerTintColor: '#FFFFFF',
                title: 'MyBookStore',
            },
        },
    },
    {
        // initialRouteName: 'UserBooks',
    },
); */

const App = createAppContainer(MainNavigator);

export default App;
