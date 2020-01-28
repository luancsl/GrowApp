import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity} from "react-native";
import { sia, requestElevation } from "../../services/sia_api";
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
        const eto_data = this.props.navigation.getParam('eto_data');
        this.setState({ eto_data: eto_data, kc: kc, loading: false })
    }

    _onPressKcPhaseSelection(valor) {
        this.props.navigation.navigate('KcPhaseSelection', { 
            eto_data: this.state.eto_data,
            kc: valor
        });
    }


    render() {
        return (
            <View>
                <View>
                    <SearchBar
                        placeholder="Pesquisar"
                        onChangeText={(value) => (this.setState({search: value, loading: true}))}
                        value={this.state.search}
                        onClear={() => (this.setState({loading: false}))}
                        platform = "android"
                        showLoading = {this.state.loading}
                    />
                </View>
                <View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.kc}
                        renderItem={({ item }) => (
                            <TouchableOpacity  onPress={ () => this._onPressKcPhaseSelection(item)}>
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