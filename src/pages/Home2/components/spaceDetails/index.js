import React, { PureComponent, useState } from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Animated, ScrollView, Easing } from "react-native";
import { SharedElement, TranslateYAndOpacity } from 'react-native-motion';
import Space from "../space";
import { WeatherBox } from "./weatherBox";
import { Icon } from 'react-native-elements';

const animateContentDetailsOpacity = new Animated.Value(0)
const opacityBack = new Animated.Value(0);
const translateBack = new Animated.Value(-100);

class SpaceDetails extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            opacityOfDestinationItem: 1,
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.phase === 'phase-2' && nextProps.phase === 'phase-3') {
            this.sharedElementRef.moveToSource();
        }
    }
    onMoveToDestinationDidFinish = () => {
        Animated.parallel([
            Animated.timing(animateContentDetailsOpacity, { toValue: 1, delay: 100 }),
            Animated.timing(opacityBack, {
                toValue: 1,
                delay: 100
            }),
            Animated.timing(translateBack, {
                toValue: 0,
                delay: 100,
            })
        ]).start();
        this.setState({ opacityOfDestinationItem: 1 })
        this.props.onSharedElementMovedToDestination();
    };
    onMoveToSourceWillStart = () => {
        Animated.parallel([
            Animated.timing(animateContentDetailsOpacity, { toValue: 0, delay: 100 }),
            Animated.timing(opacityBack, {
                toValue: 0,
                delay: 100
            }),
            Animated.timing(translateBack, {
                toValue: -100,
                delay: 100,
            })
        ]).start();
        this.setState({ opacityOfDestinationItem: 0 })
    };

    onItemBackPress = () => {
        this.props.onBackPress();
    };

    render() {
        const {
            selectedItem,
            startPosition,
            phase,
            onBackPress,
            onSharedElementMovedToSource,
        } = this.props;
        const { opacityOfDestinationItem } = this.state;

        const { items = [] } = selectedItem || {};

        if (!selectedItem) {
            return null;
        }
        
        const data = {
            date: selectedItem.data.data[0].Date,
            type: selectedItem.data.type,
            service: selectedItem.data.service,
            equation: selectedItem.data.parameters.equation,
            city: selectedItem.data.parameters.city,
            uf: selectedItem.data.parameters.state,
            eto_data: {
                rad_qo: selectedItem.data.data[0].Rad_Q0,
                rad_qg: selectedItem.data.data[0].Rad_Qg,
                tmax: selectedItem.data.data[0].Tmax,
                tmin: selectedItem.data.data[0].Tmin,
                hum: selectedItem.data.data[0].Hum,
                wind: selectedItem.data.data[0].Wind,
                eto: selectedItem.data.data[0].Eto,
            }

        };

        console.log("final", data);
        return (
            <View style={{ flex: 1 }}>
                <Animated.View style={{ flex: .15, justifyContent: 'center', paddingLeft: 15, opacity: opacityBack, transform: [{ translateY: translateBack }] }}>
                    <TouchableOpacity
                        onPress={() => this.onItemBackPress()}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='keyboard-arrow-left'
                                type='material'
                                color='#fff'
                                size={30}
                            />
                            <Text style={{ fontSize: 20, color: '#fff' }}>Voltar</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <View style={[{ flex: .85 }]}>
                    <SharedElement
                        ref={node => (this.sharedElementRef = node)}
                        sourceId={selectedItem.name}
                        easing={Easing.in(Easing.back())}
                        onMoveToDestinationDidFinish={this.onMoveToDestinationDidFinish}
                        onMoveToSourceWillStart={this.onMoveToSourceWillStart}
                        onMoveToSourceDidFinish={onSharedElementMovedToSource}
                    >
                        <View
                            style={{
                                opacity: opacityOfDestinationItem,
                                paddingHorizontal: 10,
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                zIndex: 10
                            }}
                        >
                            <Space
                                item={selectedItem}
                                onPress={() => this.onItemBackPress()}
                                isHidden={false}
                                animateOnDidMount={false}
                            />
                        </View>
                    </SharedElement>
                    <Animated.ScrollView style={{ marginTop: 50, paddingTop: 50, paddingBottom: 100, paddingVertical: 2, paddingHorizontal: 10, opacity: animateContentDetailsOpacity, backgroundColor: '#fff' }}>
                        <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56 * 0}>
                            <View style={{ flex: .2, margin: 8, padding: 10, backgroundColor: '#fff', borderRadius: 8, elevation: 3 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>Data:</Text>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>{data.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>Tipo:</Text>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>{data.type}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>Serviço:</Text>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>{data.service}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>Equação:</Text>
                                    <Text style={{ fontSize: 10, color: '#1118', }}>{data.equation}</Text>
                                </View>
                            </View>
                        </TranslateYAndOpacity>
                        <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56 * 1}>
                            <View style={{ flex: .4, height: 190, alignItems: 'center', margin: 8, padding: 0, backgroundColor: '#fff', borderRadius: 8, elevation: 3 }}>
                                <Text style={{ fontSize: 26, color: '#1115', marginBottom: 12, marginTop: 10 }}>Evapotranspiração</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 65, color: '#1119', }}> {data.eto_data.eto.toString().replace('.', ',')}</Text>
                                    <Text style={{ fontSize: 15, color: '#1118', }}>  mm/d</Text>
                                </View>
                                <Text style={{ fontSize: 13, color: '#1118', }}>Estação {data.city} - {data.uf}</Text>
                            </View>
                        </TranslateYAndOpacity>
                        <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56 * 2}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ flex: .2, height: 100, backgroundColor: '#fff' }}
                            >
                                <WeatherBox
                                    imageSource={require('@assets/sunGlobalIcon.png')}
                                    text={'Radiação Global'}
                                    value={data.eto_data.rad_qo}
                                    unity={'MJ m/d'}
                                />
                                <WeatherBox
                                    imageSource={require('@assets/sunDifuseIcon.png')}
                                    text={'Radiação Superficie'}
                                    value={Math.round(data.eto_data.rad_qg)}
                                    unity={'MJ m/d'}
                                />
                                <WeatherBox
                                    imageSource={require('@assets/temperatureMaxIcon.png')}
                                    text={'Temperatura Máxima'}
                                    value={Math.round(data.eto_data.tmax)}
                                    unity={'°C'}
                                />
                                <WeatherBox
                                    imageSource={require('@assets/temperatureMinIcon.png')}
                                    text={'Temperatura Mínima'}
                                    value={Math.round(data.eto_data.tmin)}
                                    unity={'°C'}
                                />
                                <WeatherBox
                                    imageSource={require('@assets/humidityIcon.png')}
                                    text={'Humidade do Ar'}
                                    value={Math.round(data.eto_data.hum)}
                                    unity={'%'}
                                />

                                <WeatherBox
                                    imageSource={require('@assets/windIcon.png')}
                                    text={'Velocidade do Vento'}
                                    value={Math.round(data.eto_data.wind)}
                                    unity={'m/s'}
                                />

                            </ScrollView>
                        </TranslateYAndOpacity>
                        {
                            true ?
                                <View style={{ flex: .2, flexDirection: 'row', height: 160, margin: 4, marginBottom: 60, marginTop: 10, padding: 10, backgroundColor: '#fff', borderRadius: 10, elevation: 5 }}>
                                    <Text style={{ fontSize: 22, color: '#1119', }}>Dispositivos</Text>
                                </View>
                                :
                                null
                        }
                    </Animated.ScrollView>
                </View>
            </View>
        );
    }
}

export default SpaceDetails;
