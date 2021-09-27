import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Image, Button } from 'react-native-elements'




export default (props) => {
    const kc = props.kc;

    const onSelectionPhase = (value) => {
        props.onSelection ? props.onSelection(value) : '';
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Image
                    source={{ uri: kc.icon }}
                    containerStyle={{ borderRadius: 5, overflow: 'hidden', }}
                    style={{ width: 100, height: 100, }}
                />
            </View>

            <View style={styles.buttons}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, color: '#404040', marginBottom: 5 }}>Qual a fase que a cultura se encontra?</Text>
                </View>

                <Button
                    title={'Inicio - ' + kc.iniStagekc}
                    buttonStyle={{ marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2, }}
                    type="outline"
                    onPress={() => onSelectionPhase({ cultureImageLink: kc.icon, culturePhase: 'ini', kc: kc.iniStagekc })}
                />
                <Button
                    title={'Meio - ' + kc.midStagekc}
                    buttonStyle={{ marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2, }}
                    type="outline"
                    onPress={() => onSelectionPhase({ cultureImageLink: kc.icon, culturePhase: 'mid', kc: kc.midStagekc })}
                />
                <Button
                    title={'Fim - ' + kc.endStagekc}
                    buttonStyle={{ marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2, }}
                    type="outline"
                    onPress={() => onSelectionPhase({ cultureImageLink: kc.icon, culturePhase: 'end', kc: kc.endStagekc })}
                />
            </View>
        </View>
    );

}


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
        paddingHorizontal: 50,
        justifyContent: 'flex-start',

    },
    button: {

    },
})