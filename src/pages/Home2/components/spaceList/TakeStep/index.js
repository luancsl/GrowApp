import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { KcSelection, StepEtc } from './pages';

const Stack = createStackNavigator();

class TakeStep extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        this.props.onTakeStep();
        const eto_data = this.props.route.params;
        this.setState({ data: eto_data });
    }

    componentWillReceiveProps(props) {
        console.log('ajuda: ', props);
    }

    _handleOnFinish() {
        this.props.onFinish();
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationContainer
                    independent={true}
                    ref={this.ref}
                >
                    <Stack.Navigator
                        initialRouteName="KcSelection"
                        headerMode="none"
                        screenOptions={{ cardStyle: { backgroundColor: '#fff' } }}
                    >

                        <Stack.Screen
                            name='KcSelection'
                            options={{ gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}
                        >
                            {props => <KcSelection {...props} etoData={this.state.etoData} />}
                        </Stack.Screen>

                        <Stack.Screen
                            name='StepEtc'
                            options={{ gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }}
                        >
                            {props => <StepEtc {...props} data={this.state.data} onFinish={() => this._handleOnFinish()} />}
                        </Stack.Screen>

                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

export default TakeStep;