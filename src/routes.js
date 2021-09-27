import React from "react";
import { Home, ConfirmPage, TakeStep, Device, Home2, CultureList, Profile } from '@pages'
import { View, Animated, StatusBar, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView, InteractionManager } from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Reanimated from 'react-native-reanimated';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const animatedOpacity = new Animated.Value(1);
const animatedTY = new Animated.Value(0);

const startAnimation = () => {
    Animated.parallel([
        Animated.timing(animatedOpacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }),
        Animated.timing(animatedTY, {
            toValue: 70,
            duration: 600,
            useNativeDriver: true
        })
    ]).start();

}

const endAnimation = () => {
    return (
        Animated.parallel([
            Animated.timing(animatedOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.timing(animatedTY, {
                toValue: 70,
                duration: 600,
                useNativeDriver: true
            })
        ]).start()
    );
}

/* const Stack = createStackNavigator();

const DrawerStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home2'
                component={Home2}
                options={{ header: null }}
            />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Home2'
            >
                <Drawer.Screen
                    name='Device'
                    component={Device}
                />
                <Drawer.Screen
                    name='Home2'
                    component={Home2}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
} */

function MyTabBar({ state, descriptors, navigation, position }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = Reanimated.interpolate(position, {
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                });

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <Reanimated.Text style={{ opacity }}>
                            {label}
                        </Reanimated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarPosition={"bottom"}
            style={{
                backgroundColor: '#ffff'
            }}
            tabBarOptions={{
                showIcon: true,
                showLabel: false,
                renderIndicator: () => null,
            }}

        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            color={color}
                            size={focused ? 22 + 3 : 22}
                            name='home'
                            type='feather'
                        />
                    )
                }}
            >
                {props => <Home2 {...props} />}
            </Tab.Screen>

            <Tab.Screen
                name="List"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            color={color}
                            size={focused ? 23 + 3 : 23}
                            name='list'
                            type='feather'
                        />
                    )
                }}
            >
                {props => <CultureList {...props} />}
            </Tab.Screen>

            <Tab.Screen
                name="Devices"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            color={color}
                            size={focused ? 23 + 3 : 23}
                            name='mobile-signal'
                            type='foundation'
                        />
                    )
                }}
            >
                {props => <Device {...props} />}
            </Tab.Screen>

            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            color={color}
                            size={focused ? 22 + 2 : 22}
                            name='user-circle'
                            type='font-awesome'
                        />
                    )
                }}
            >
                {props => <Profile {...props} />}
            </Tab.Screen>

        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name='Initial'
                component={TabNavigator}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name='TakeStep'
                component={TakeStep}
                options={{ headerStatusBarHeight: 10 }}
            />
        </Stack.Navigator>
    );
}

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    );
}

const App = MainNavigation;

export default App;
