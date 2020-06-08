import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity } from "react-native";
import { sia } from "@services";
import Search from 'react-native-search-box';
import { ListItem, SearchBar } from 'react-native-elements';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { TypeIrrigation, FlowRate, KcPhaseSelection } from './components';
import { FlowCalculator } from '@common';
import { Image, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SpaceActions } from "@store/ducks/space";

const buttonTextStyle = {
    color: '#686868',
    fontWeight: 'bold'
};

const buttonStyle = {
    padding: 0,
};

const buttonsText = {
    nextBtnText: 'Próximo',
    cancelBtnText: 'Cancelar',
    previousBtnText: 'Anterior',
    finishBtnText: 'Confirmar'
}


class StepEtc extends PureComponent {
    state = {
        dripMinute: 0,
        dripperSpacing: 0,
        rowWidth: 0,
        cultureImageLink: '',
        kc: 0,
        culture: '',
        cultureType: '',
        culturePhase: '',
        typeIrrigation: 'drip',
        time: 0,
        activeStep: 0,
        flowRate: 0,
        eto: null,
        data: null,

    }

    componentDidMount() {
        const { data } = this.props;
        const { payload } = this.props.route.params;;
        this.setState({ data: data, culture: payload.kc.culture, cultureType: payload.kc.type });
    }

    defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            justifyContent: 'center'
        }
    };

    onNextStep = () => {
        console.log('called next step');
        const result = FlowCalculator(this.state.dripMinute, this.state.dripperSpacing, this.state.rowWidth);
        this.setState({ flowRate: result });
    };

    onCancelStep = () => {
        console.log('called cancel step');
        this.props.navigation.goBack();
    };

    onPrevStep = () => {
        console.log('called previous step');
    };

    onSubmitSteps = () => {
        console.log('called on submit step.');
        this.handleSubmit();
    };

    handleKcPhaseSelection(value) {
        this.setState({ activeStep: this.state.activeStep + 1, cultureImageLink: value.cultureImageLink, culturePhase: value.culturePhase, kc: value.kc });
    }

    handleTypeIrrigationSelection(value) {
        this.setState({ activeStep: this.state.activeStep + 1, typeIrrigation: value });
    }

    handleSubmit() {
        this.props.onFinish();

        const { spaces, addSpace } = this.props;

        const timeCalc = Math.floor(Math.random() * (160 - 1) + 1);
        console.log('kcCulture:', this.state.kc);

        const name = this.state.cultureType === '' ?
            `${this.state.culture.substr(0, 1)}-${this.state.culturePhase}${this.state.typeIrrigation.substr(0, 1).toUpperCase()}${this.state.typeIrrigation.substr(-1)}-${this.state.data.features.parameters.location.lat.toString().substr(-2, 2)}${this.state.data.features.parameters.location.lon.toString().substr(-2, 2)}`
            :
            `${this.state.culture.substr(0, 1)}-${this.state.culturePhase}${this.state.cultureType.substr(0, 1).toUpperCase()}${this.state.cultureType.substr(-1)}${this.state.typeIrrigation.substr(0, 1).toUpperCase()}${this.state.typeIrrigation.substr(-1)}-${this.state.data.features.parameters.location.lat.toString().substr(-2, 2)}${this.state.data.features.parameters.location.lon.toString().substr(-2, 2)}`
        const data = {
            name: name,
            cultureImageLink: this.state.cultureImageLink,
            culture: this.state.culture,
            cultureType: this.state.cultureType,
            culturePhase: this.state.culturePhase,
            kc: this.state.kc,
            data: this.state.data.features,
            time: timeCalc,
            typeIrrigation: this.state.typeIrrigation,
            currentTime: timeCalc,
            play: true,
        }
        console.log("luan: ", data);
        addSpace(data);
    }

    render() {
        /* const progressStepsStyle = {
            borderWidth: 2,
            activeStepIconBorderColor: '#686868',
            activeLabelColor: '#686868',
            activeStepNumColor: 'white',
            activeStepIconColor: '#686868',
            completedStepIconColor: '#686868',
            completedProgressBarColor: '#686868',
            completedCheckColor: '#4bb543',
        }; */

        const { payload } = this.props.route.params;
        const kc = payload.kc;

        return (
            <View style={{ flex: 0.82, padding: 1 }}>
                <ProgressSteps
                    activeStep={this.state.activeStep}
                    onChangeActiveStep={(value) => this.setState({ activeStep: value })}
                >
                    <ProgressStep
                        label="  Fase do Cultivo"
                        {...buttonsText}
                        onNext={this.onNextStep}
                        onCancel={this.onCancelStep}
                        onPrevious={this.onPrevStep}
                        scrollViewProps={this.defaultScrollViewProps}
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnHidden={true}
                    >
                        <View style={{ flex: 1 }}>
                            <KcPhaseSelection
                                kc={kc}
                                onSelection={(value) => this.handleKcPhaseSelection(value)}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep
                        label="Tipo de Irrigação"
                        {...buttonsText}
                        onNext={this.onNextStep}
                        onCancel={this.onCancelStep}
                        onPrevious={this.onPrevStep}
                        scrollViewProps={this.defaultScrollViewProps}
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnHidden={true}
                    >
                        <View style={{ flex: 1 }}>
                            <TypeIrrigation
                                onSelection={(value) => this.handleTypeIrrigationSelection(value)}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep
                        label="Vazão"
                        {...buttonsText}
                        onNext={this.onNextStep}
                        onCancel={this.onCancelStep}
                        onPrevious={this.onPrevStep}
                        scrollViewProps={this.defaultScrollViewProps}
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnHidden={false}
                    >
                        <View style={{ flex: 1 }}>
                            <FlowRate
                                dripMinute={'' + this.state.dripMinute}
                                onChangeDripMinute={(value) => this.setState({ dripMinute: parseInt(value) })}
                                dripperSpacing={'' + this.state.dripperSpacing}
                                onChangeDripperSpacing={(value) => this.setState({ dripperSpacing: parseFloat(value) })}
                                rowWidth={'' + this.state.rowWidth}
                                onChangeRowWidth={(value) => this.setState({ rowWidth: parseFloat(value) })}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep
                        label="Nome"
                        {...buttonsText}
                        onNext={this.onNextStep}
                        onCancel={this.onCancelStep}
                        onPrevious={this.onPrevStep}
                        scrollViewProps={this.defaultScrollViewProps}
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnHidden={false}
                    >
                        <View style={{ flex: 1 }}>

                        </View>
                    </ProgressStep>
                    <ProgressStep
                        label="Confirmação"
                        {...buttonsText}
                        onNext={() => this.handleSubmit()}
                        onPrevious={this.onPrevStep}
                        scrollViewProps={this.defaultScrollViewProps}
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnHidden={false}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Button
                                title={'Confirmar'}
                                buttonStyle={{ marginBottom: 10 }}
                                onPress={() => this.handleSubmit()}
                            />
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    spaces: state.spaceState
});

const mapDispatchToProp = dispatch => bindActionCreators(SpaceActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProp)(StepEtc);


const styles = StyleSheet.create({

});