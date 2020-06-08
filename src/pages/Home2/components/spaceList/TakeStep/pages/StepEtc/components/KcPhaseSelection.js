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
                    source={{ uri: kc.image_link }}
                    containerStyle={{ borderRadius: 5, overflow: 'hidden', }}
                    style={{ width: 60, height: 60, }}
                />
            </View>

            <View style={styles.buttons}>
                <View style={{ marginBottom: 10 }}>
                    <Text>Qual a fase que a cultura se encontra?</Text>
                </View>

                <Button
                    title={'Inicio - ' + kc.ini}
                    buttonStyle={{ marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2, }}
                    type="outline"
                    onPress={() => onSelectionPhase({ cultureImageLink: kc.image_link, culturePhase: 'ini', kc: kc.ini })}
                />
                <Button
                    title={'Meio - ' + kc.mid}
                    buttonStyle={{ marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2, }}
                    type="outline"
                    onPress={() => onSelectionPhase({ cultureImageLink: kc.image_link, culturePhase: 'mid', kc: kc.mid })}
                />
                <Button
                    title={'Fim - ' + kc.end}
                    buttonStyle={{ marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', elevation: 2, }}
                    type="outline"
                    onPress={() => onSelectionPhase({ cultureImageLink: kc.image_link, culturePhase: 'end', kc: kc.end })}
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
        paddingHorizontal: 80,
        justifyContent: 'flex-start',

    },
    button: {

    },
})