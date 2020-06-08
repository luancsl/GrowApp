import React, { PureComponent } from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity } from "react-native";
import Search from 'react-native-search-box';
import { Image, Button } from 'react-native-elements'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { material, systemWeights } from 'react-native-typography'
import { Icon, Avatar } from 'react-native-elements'
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { Animated } from 'react-native';



import { Modal } from '@components';


const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedView = Animated.createAnimatedComponent(View);
const scale = new Animated.Value(1);
const opacity = new Animated.Value(1);
const translateY = new Animated.Value(0);
const opacityInterpolate = opacity.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [0, 0, 1]
});

class SpaceComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            playButtonToggled: true
        };
    }

    async componentWillMount() {

    }

    _onPressPlayButton() {
        this.setState(prevState => ({ playButtonToggled: !prevState.playButtonToggled }));
        if (this.state.playButtonToggled) {
            console.log("pipi")
            Animated.parallel([
                Animated.timing(scale, { toValue: 1.2, easing: Easing.elastic(), useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: -20, useNativeDriver: true })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(scale, { toValue: 1, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, useNativeDriver: true })
            ]).start();
        }
    }



    render() {
        const name = this.props.name;
        cultureImageLink = this.props.cultureImageLink;
        const kc = this.props.kc;
        const culturePhase = this.props.culturePhase;
        const culture = this.props.culture;
        const time = this.props.time;
        const currentTime = this.props.currentTime;
        console.log("DFSF:", this.props.eto);
        let { data, service, type, parameters } = this.props.eto.features;
        data = data[0];
        const etc = (parseFloat(data.Eto) * parseFloat(phase.value)).toFixed(2);

        return (
            <View style={styles.container}>

                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} coverScreen={true} >
                    <Text style={styles.text}>Modal centered</Text>
                    <View>
                        <Avatar
                            size="large"
                            source={{ uri: culture.image_link }}
                        />
                    </View>

                    <Text style={[material.body1, { marginVertical: -3 }]}> {name} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Serviço: {service} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Tipo do Serviço: {type} </Text>
                    {
                        parameters.city !== undefined ? <Text style={[material.body1, { marginVertical: -3 }]}> Estação: {parameters.city} - {parameters.state} </Text> : null
                    }
                    <Text style={[material.body1, { marginVertical: -3 }]}> Localização: {parameters.location.lat.toFixed(5)}, {parameters.location.lon.toFixed(5)} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Temp Maxima: {data.Tmax} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Temp Minima: {data.Tmin} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Umidade: {data.Hum} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Veloc do Vento: {data.Wind} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Radiação Global: {data.Rad_Q0} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Radicação Superficie: {data.Rad_Qg} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Eto: {data.Eto} mm </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Fase: {phase.name} - {phase.value} </Text>
                    <Text style={[material.body1, { marginVertical: -3 }]}> Etc: {etc} mm </Text>

                </Modal>
                <View style={styles.left}>
                    <AnimatedCircularProgress
                        size={60}
                        width={2}
                        fill={Math.floor((currentTime / time) * 100)}
                        tintColor="#00e0ff"
                        backgroundColor="#3d5875">
                        {
                            (fill) => (
                                <View>
                                    <Avatar
                                        rounded
                                        size="medium"
                                        source={{ uri: culture.image_link }}
                                    />
                                    {/* <Text>
                                        {this.state.fill}
                                    </Text> */}
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.center}>

                    <TouchableOpacity onPress={this.props.onPressCenter !== undefined ? this.props.onPressCenter : () => this.refs.modal3.open()}>

                        <Text style={[material.title, { marginVertical: -3 }]}> {name} </Text>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[material.body2, systemWeights.thin]}> Culture: {culture.culture} </Text>
                            <Text style={[material.body2, systemWeights.thin]}> type: {culture.type} </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                name='link'
                                type='MaterialIcons'
                                size={11}
                            />
                            <Text style={material.caption}> {'Linked'} </Text>
                            <Icon
                                name='video-input-antenna'
                                type='material-community'
                                color='#32cd32'
                                size={11}
                            />
                            <Text style={material.caption}> {'Online'} </Text>
                            <Icon
                                name='timer'
                                type='material-community'
                                color='#daa520'
                                size={11}
                            />
                            <Text style={material.caption}> {currentTime + ' min'} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.right}>
                    <Icon
                        name='pause'
                        type='MaterialIcons'
                        color='#517fa4'
                        size={30}
                    />
                </View>
            </View>
        )
    }
}

export default SpaceComponent;

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3: {
        height: 360,
        width: 300,
        borderRadius: 3,
    },
    container: {
        flex: 1,
        paddingLeft: 3,
        paddingVertical: 8,
        marginVertical: 3,
        marginHorizontal: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9992',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    left: {
        flex: 0.36

    },
    center: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    right: {
        flex: 0.2,
        justifyContent: 'center',
        backgroundColor: '#1492',
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 5

    }
})