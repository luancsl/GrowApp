import React, { PureComponent, useState } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";


const _WeatherBox = (props) => {

    return (
        <View style={{ height: 93, width: 88, margin: 5, padding: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, elevation: 3 }}>
            <Image
                style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'center',
                }}
                source={props.imageSource}
            />
            <Text style={{ fontSize: 7, color: '#1118' }}>{props.text}</Text>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <Text style={{ fontSize: 25, color: '#1119', }}>{props.value}</Text>
                <Text style={{ fontSize: 7, color: '#1119', }}>{props.unity}</Text>
            </View>
        </View>
    );
}

_WeatherBox.propTypes = {
    imageSource: PropTypes.func,
    text: PropTypes.string,
    value: PropTypes.number,
    unity: PropTypes.string
}

export const WeatherBox = _WeatherBox;