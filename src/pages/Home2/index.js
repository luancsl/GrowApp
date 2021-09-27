import React, { PureComponent } from 'react';
import { View, Animated, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView, InteractionManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { Space, SpaceDetails, SpaceList } from "./components";
import { SharedElementRenderer } from 'react-native-motion';
import {
    Container,
    Header,
    Title,
    Content,
    ContentHeader,
    ContentItem,
    Footer,
    ButtonMap
} from "./styled";



const opacityTitle = new Animated.Value(1);
const translateTitle = new Animated.Value(0);

class Home2 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            phase: 'phase-0',
        }
        this.ref = React.createRef();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {

    }

    onItemPressed = item => {
        Animated.parallel([
            Animated.timing(opacityTitle, {
                toValue: 0,
                delay: 200
            }),
            Animated.timing(translateTitle, {
                toValue: -100,
                delay: 500,
            })
        ]).start();
        this.setState({
            phase: 'phase-1',
            selectedItem: item,
        });
    };

    onBackPressed = () => {
        this.setState({
            phase: 'phase-3',
        });
        Animated.parallel([
            Animated.timing(opacityTitle, {
                toValue: 1,
                delay: 500
            }),
            Animated.timing(translateTitle, {
                toValue: 0,
                delay: 200,
            })
        ]).start();
    };

    onSharedElementMovedToSource = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                selectedItem: null,
                phase: 'phase-0',
            });
        });
    };

    onSharedElementMovedToDestination = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                phase: 'phase-2',
            });
        });
    };

    renderPage(props) {
        const { phase, selectedItem } = this.state;
        console.log("SELE >>", selectedItem);
        return (
            <View style={{ flex: 1 }}>
                <SpaceList
                    {...props}
                    phase={phase}
                    selectedItem={selectedItem}
                    onItemPress={this.onItemPressed}
                    navigation={props.navigation}
                />
                <SpaceDetails
                    phase={phase}
                    selectedItem={selectedItem}
                    onBackPress={this.onBackPressed}
                    onSharedElementMovedToDestination={this.onSharedElementMovedToDestination}
                    onSharedElementMovedToSource={this.onSharedElementMovedToSource}
                />
            </View>
        );
    }

    render() {
        return (
            <SharedElementRenderer >
                <View style={{ flex: 1, backgroundColor: '#ffff' }}>
                    <Header style={{ position: 'absolute', top: 0, bottom: 245, left: 0, right: 0, }}>
                        <Title style={{ opacity: opacityTitle, transform: [{ translateY: translateTitle }] }}>
                            GrowApp
                        </Title>
                    </Header>
                    <View style={{ flex: 1 }}>
                        {this.renderPage(this.props)}
                    </View>
                    <Footer >

                    </Footer>
                </View>
            </SharedElementRenderer>
        );
    }
}

export default Home2;