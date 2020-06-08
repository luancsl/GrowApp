import React, { PureComponent, useState } from "react";
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ScaleAndOpacity } from 'react-native-motion';
import {
    Container,
    Center,
    CenterBody,
    CenterFooter,
    Left,
    Right,
    TextType1,
    TextType2,
    TextType3,
    AnimatedCircularProgressCustom,
    IconLink,
    IconSignal,
    IconTime,
    IconPause,
    IconPlay
} from "./styled";

const scale = new Animated.Value(1);
const opacity = new Animated.Value(1);
const translateY = new Animated.Value(0);
const opacityInterpolate = opacity.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [0, 0, 1]
});

class Space extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            playButtonToggled: true
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props) {

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

    onPressed = event => {
        const { onPress, item } = this.props;
        onPress(item, event.nativeEvent);
    };

    render() {

        const { item, isHidden, animateOnDidMount } = this.props;
        const { name, cultureImageLink, currentTime, time } = item;
        return (
            <ScaleAndOpacity
                isHidden={isHidden}
                animateOnDidMount={animateOnDidMount}
            >
                <Container
                    style={this.props.style ? this.props.style : null}
                >
                    <Left >
                        <AnimatedCircularProgressCustom fill={Math.floor((currentTime / time) * 100)}>
                            {(fill) => (<Avatar rounded size="medium" source={{ uri: cultureImageLink }} />)}
                        </AnimatedCircularProgressCustom>
                    </Left>
                    <Center onPress={this.onPressed}>
                        <TextType1 > {name} </TextType1>

                        <CenterBody>
                            <TextType2> Culture: a definir </TextType2>
                            <TextType2> type: a definir </TextType2>
                        </CenterBody>

                        <CenterFooter>
                            <IconLink />
                            <TextType3> {'Linked'} </TextType3>

                            <IconSignal />
                            <TextType3> {'Online'} </TextType3>

                            <IconTime />
                            <TextType3 > {currentTime + ' min'} </TextType3>
                        </CenterFooter>
                    </Center>
                    <Right onPress={() => this._onPressPlayButton()}>
                        {this.state.playButtonToggled ? <IconPlay /> : <IconPause />}
                    </Right>
                </Container>
            </ScaleAndOpacity>
        );
    }
}

export default Space;
