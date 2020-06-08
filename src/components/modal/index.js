import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default (props) => {
    return (
        <Modal
            visible={props.visible}
            transparent={props.transparent}
            animationType={props.animationType}
            hardwareAccelerated={props.hardwareAccelerated}
            onRequestClose={props.onRequestClose}
        >
            <TouchableWithoutFeedback onPress={() => { props.pressOut() }}>
                <View style={[styles.modal, { backgroundColor: props.backgroundColor }]} >
                    <TouchableWithoutFeedback>
                        <View style={[styles.modal3, { height: props.height, width: props.width }, props.style]} >
                            {props.children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3: {
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#c0c0c0',
        overflow: 'hidden'
    }
});