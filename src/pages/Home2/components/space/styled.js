import { Animated, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';
import { Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export const Container = styled.View`
    height: 81px;
    background-color: #fff;
    padding: 10px 5px 10px 5px;
    margin: 5px 1px 5px 1px;
    border-radius: 15px;
    justify-content: space-between;
    flex-direction: row;
    elevation: 2;
`;

export const Left = styled.View`
    flex: 0.36;
`;

export const Center = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-start;
`;

export const CenterHeader = styled.View`
    flex-direction: row;
    justify-content: flex-start; 
    align-items: center;
`;

export const CenterBody = styled(CenterHeader)``;

export const CenterFooter = styled(CenterHeader)`
    padding-left: 4px;
`;

export const Right = styled.TouchableOpacity`
    flex: 0.2;
    justify-content: center;
    background-color: #1492;
    margin: 15px 5px 15px 5px;
    padding: 0px 0px 0px 0px;
    border-width: 1px;
    border-color: #6664;
    border-radius: 15px;
`;

export const TextType1 = styled.Text`
    ${material.title}
    color: #1119;
    margin-top: -3px;
    margin-bottom: -3px;
`;

export const TextType2 = styled.Text`
    ${[material.body2, systemWeights.thin]};
`;

export const TextType3 = styled.Text`
    ${material.caption};
`;

export const IconPlay = styled(Icon).attrs(props => ({
    name: 'play-arrow',
    type: 'MaterialIcons',
    color: '#517fa4',
    size: 30,
}))``;

export const IconPause = styled(Icon).attrs(props => ({
    name: 'pause',
    type: 'MaterialIcons',
    color: '#517fa4',
    size: 30,
}))``;

export const IconLink = styled(Icon).attrs(props => ({
    name: 'link',
    type: 'MaterialIcons',
    size: 11,
}))``;

export const IconSignal = styled(Icon).attrs(props => ({
    name: 'video-input-antenna',
    type: 'material-community',
    color: '#32cd32',
    size: 11,
}))``;

export const IconTime = styled(Icon).attrs(props => ({
    name: 'timer',
    type: 'material-community',
    color: '#daa520',
    size: 11,
}))``;


export const AnimatedCircularProgressCustom = styled(AnimatedCircularProgress).attrs(props => ({
    tintColor: '#00e0ff',
    backgroundColor: '#3d5875',
    size: 60,
    width: 2,
}))``;