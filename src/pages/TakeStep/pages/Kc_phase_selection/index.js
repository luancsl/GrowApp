import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Button } from 'react-native-elements'

class KcPhaseSelection extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            kc: null,
            eto_data: null,
        };
    }

    async componentWillMount() {
        const kc = this.props.navigation.getParam('kc');
        const eto_data = this.props.navigation.getParam('eto_data');
        this.setState({
            kc: kc,
            eto_data: eto_data,
        });
    }

    _onPressConfirm(name, value) {
        console.log('juk', this.state.kc);
        const kc_info = { kc: this.state.kc, phase_select: { name: name, value: value } };
        this.props.navigation.navigate('ConfirmPage', {
            eto_data: this.state.eto_data,
            kc_info: kc_info,
        });
    }

    render() {
        const kc = this.state.kc
        console.log("KASDFD: ", kc);
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Image
                        source={{ uri: kc.icon }}
                        containerStyle={{ borderRadius: 5, overflow: 'hidden', }}
                        style={{ width: 150, height: 150, }}
                    />
                </View>

                <View style={styles.buttons}>
                    <View>
                        <Text>Qual a fase?</Text>
                    </View>

                    <Button
                        title={'Inicio - ' + kc.iniStagekc}
                        buttonStyle={{ marginBottom: 10 }}
                        type="outline"
                        onPress={() => this._onPressConfirm('ini', kc.iniStagekc)}
                    />
                    <Button
                        title={'Meio - ' + kc.midStageKc}
                        buttonStyle={{ marginBottom: 10 }}
                        type="outline"
                        onPress={() => this._onPressConfirm('mid', kc.midStagekc)}
                    />
                    <Button
                        title={'Fim - ' + kc.endStagekc}
                        buttonStyle={{ marginBottom: 10 }}
                        type="outline"
                        onPress={() => this._onPressConfirm('end', kc.endStagekc)}
                    />
                </View>

            </View>
        )
    }
}

export default KcPhaseSelection;

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