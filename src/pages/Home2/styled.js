import { Animated, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from "react-native-linear-gradient";

export const Container = styled.View`
    flex:1;
`;

export const Title = styled(Animated.Text)`
    font-size:40px;
    font-weight: bold;
    color: #fff;
    
`;

export const Header = styled(LinearGradient).attrs(props => ({
    colors: ["#ffff", "#C4D66A", "#44A266"],
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
}))`
    flex: 0.8;
    align-items: center;
    padding-bottom: 250px;
    justify-content: center;
    margin-left: 0px;
    padding-right:10px;
`;


export const ButtonMap = styled.TouchableOpacity`
    background-color: #fff;
    height: 40px;
    width: 80px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    elevation:3;
`;

export const Content = styled(Animated.View)`
    flex:1;
    background-color: #fff;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-top-width: 2px;
    border-top-color: #1113;    
`;

export const ContentHeader = styled(Animated.View)`
    padding: 6px 20px 6px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-bottom-color: #1112;
`;

export const ContentItem = styled.View`
    flex:1;
`;

export const Footer = styled.View`
    background-color: #fff;
    border-width: 0px;
`;
