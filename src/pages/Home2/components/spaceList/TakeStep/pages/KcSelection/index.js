import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, StatusBar } from "react-native";
import { sia } from "@services";
import Search from 'react-native-search-box';
import { ListItem, SearchBar } from 'react-native-elements'

class KcSelection extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            eto_data: null,
            kc: null,
            search: '',
            loading: true
        };
    }

    async componentWillMount() {
        const kc = await sia.kc();
        const eto_data = this.props.etoData;
        this.setState({ eto_data: eto_data, kc: kc, loading: false })
    }

    _onPressKcPhaseSelection(valor) {
        this.props.navigation.navigate('StepEtc', {
            payload: {
                eto_data: this.state.eto_data,
                kc: valor
            }

        });
    }


    render() {
        return (
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <StatusBar backgroundColor='#fff' hidden={true} />
                <View>
                    <SearchBar
                        placeholder="Pesquisar"
                        onChangeText={(value) => (this.setState({ search: value, loading: true }))}
                        value={this.state.search}
                        onClear={() => (this.setState({ loading: false }))}
                        platform="android"
                        showLoading={this.state.loading}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.kc}
                        style={{ flex: 1 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this._onPressKcPhaseSelection(item)}>
                                <ListItem
                                    title={item.culture}
                                    subtitle={item.type}
                                    leftAvatar={{
                                        source: item.image_link && { uri: item.image_link },
                                        title: item.culture
                                    }}
                                    bottomDivider
                                    chevron
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }

}


export default KcSelection;