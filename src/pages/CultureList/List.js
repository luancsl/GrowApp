import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, NativeModules, RefreshControl, ScrollView } from "react-native";
import { Image, Button } from 'react-native-elements';
import { sia } from "@services";
import Item from "./Item";

class List extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            kc: null,
            refreshing: false,
        }

    }

    componentDidMount() {
        this._onRefresh();
    }

    componentWillReceiveProps(props) {
        this._onRefresh();
    }

    _getCulture() {
        return sia.kc().then((data) => {
            this.setState({ kc: data });
        });
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this._getCulture().then(() => this.setState({ refreshing: false }));
    }
    _onItemPress = (item) => {
        this.props.navigation.navigate("Details", {item: item});
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <FlatList
                    data={this.state.kc}
                    keyExtractor={item => item._id}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                    renderItem={({item}) => <Item item={item} onItemPress={this._onItemPress} />}
                />
            </View>
        );
    }
}

export default List;