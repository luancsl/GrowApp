import React, { PureComponent } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import Search from 'react-native-search-box';
import { Image, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "../../store/ducks/space";

class ConfirmPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            kc_info: null,
            eto_data: null,
        };
    }

    async componentWillMount() {
        const kc_info = this.props.navigation.getParam('kc_info');
        const eto_data = this.props.navigation.getParam('eto_data');
        this.setState({
            kc_info: kc_info,
            eto_data: eto_data
        });
    }

    async _addEtc(value) {
        let etc_list = JSON.parse(await AsyncStorage.getItem('etc_list'));

        if (etc_list === null) {
            console.log("entrou");
            etc_list = [];
        }
        etc_list.push(value);

        await AsyncStorage.setItem('etc_list', JSON.stringify(etc_list));
        return true;
    }

    _onPressHome() {
        const { spaces, addSpace } = this.props;
        const kc_info = this.state.kc_info;
        const eto_data = this.state.eto_data;
        console.log('full', kc_info.kc)

        const timeCalc = Math.floor(Math.random() * (160 - 1) + 1);

        const data = {
            name: '002',
            kc: kc_info.kc,
            phase_select: kc_info.phase_select,
            eto: eto_data,
            time: timeCalc,
            currentTime: timeCalc,
            play: true,
        }

        this._addEtc(data);
        addSpace(data);

        this.props.navigation.navigate('Home');
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.header}>

                </View>

                <Button
                    title={'Confirmar'}
                    buttonStyle={{ marginBottom: 10 }}
                    onPress={() => this._onPressHome()}
                />

            </View>
        )
    }
}

const mapStateToProps = state => ({
    spaces: state.spaceState
});

const mapDispatchToProp = dispatch => bindActionCreators(SpaceActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProp)(ConfirmPage);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        padding: 20,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttons: {
        flex: 1,
        paddingHorizontal: 60,
        justifyContent: 'flex-start',
    },
    button: {

    },
})