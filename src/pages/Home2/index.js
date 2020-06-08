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

    componentWillReceiveProps(props){
        
    }

    onItemPressed = item => {
        this.setState({
            phase: 'phase-1',
            selectedItem: item,
        });
    };

    onBackPressed = () => {
        this.setState({
            phase: 'phase-3',
        });
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
                    <Header style={{ position: 'absolute', top: 0, bottom:245, left: 0, right: 0, }}>
                        <Title >
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