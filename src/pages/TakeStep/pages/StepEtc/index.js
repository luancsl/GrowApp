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
import withObservables from '@nozbe/with-observables'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'


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
        dripMinute: '',
        dripperSpacing: '',
        rowWidth: '',
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
        name: '',

    }

    componentDidMount() {
        console.log("DASS>> ", JSON.stringify(this.props.data.features, null, 4));
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

    onNextStepFlow = () => {
        console.log('called next step');
        const result = FlowCalculator(this.state.dripMinute, this.state.dripperSpacing, this.state.rowWidth);
        /* const name = this.state.cultureType === '' ?
            `${this.state.culture.substr(0, 1)}-${this.state.culturePhase}${this.state.typeIrrigation.substr(0, 1).toUpperCase()}${this.state.typeIrrigation.substr(-1)}-${this.state.data.features.parameters.location.lat.toString().substr(-2, 2)}${this.state.data.features.parameters.location.lon.toString().substr(-2, 2)}`
            :
            `${this.state.culture.substr(0, 1)}-${this.state.culturePhase}${this.state.cultureType.substr(0, 1).toUpperCase()}${this.state.cultureType.substr(-1)}${this.state.typeIrrigation.substr(0, 1).toUpperCase()}${this.state.typeIrrigation.substr(-1)}-${this.state.data.features.parameters.location.lat.toString().substr(-2, 2)}${this.state.data.features.parameters.location.lon.toString().substr(-2, 2)}` */

        this.setState({ name: 'maria', flowRate: result });
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

        const { spaces, addSpace, database } = this.props;

        const timeCalc = Math.floor(Math.random() * (10 - 1) + 1);
        console.log('kcCulture:', this.state.kc);


        const data = {
            name: `${Math.random()}`,
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

        database.action(async () => {
            return await database.collections.get('spaces_profile').create(spaceprofile => {
                spaceprofile.name = data.name
                spaceprofile.cultureImageLink = data.cultureImageLink
                spaceprofile.kc = data.kc
            })
        })
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
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
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
                        nextBtnDisabled={true}
                        nextBtnText=''
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
                        nextBtnDisabled={true}
                        nextBtnText=''
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
                        onNext={this.onNextStepFlow}
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
                        <View style={{ flex: 1, paddingHorizontal: 25 }}>
                            <View style={{ marginBottom: 5, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, color: '#404040' }}>Nome único para o espaço</Text>
                                <Text style={{ fontSize: 10, color: '#1118', fontStyle: 'italic' }}>Dê um nome único para o espaço ou deixe como o da sugestão.</Text>
                            </View>
                            <TextInput
                                style={{ height: 40, backgroundColor: '#F5F5F5', borderRadius: 10, elevation: 1 }}
                                value={this.state.name}
                                onChangeText={value => this.setState({ name: value })}
                            />
                        </View>
                    </ProgressStep>
                    <ProgressStep
                        label="Confirme"
                        {...buttonsText}
                        onPrevious={this.onPrevStep}
                        onSubmit={() => this.handleSubmit()}
                        scrollViewProps={this.defaultScrollViewProps}
                        nextBtnTextStyle={buttonTextStyle}
                        previousBtnTextStyle={buttonTextStyle}
                        nextBtnHidden={false}
                    >
                        <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ marginRight: 20, borderRadius: 10, overflow: 'hidden', backgroundColor: '#fff', elevation: 5 }}>
                                    <Image
                                        source={{ uri: this.state.cultureImageLink }}
                                        containerStyle={{ borderRadius: 5, overflow: 'hidden', }}
                                        style={{ width: 100, height: 100 }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 23, color: '#1118', fontWeight: 'bold', flexWrap: 'wrap', alignItems: 'flex-start' }}>Cultura {this.state.culture}</Text>
                                    {this.state.cultureType !== '' ?
                                        <Text>Tipo {this.state.cultureType}</Text>
                                        :
                                        null
                                    }
                                </View>
                            </View>
                            <Text style={{ fontSize: 20, color: '#404040', marginTop: 20 }}>Fase do cultivo</Text>
                            <Text>Fase {this.state.culturePhase} Kc {this.state.kc}</Text>
                            <Text style={{ fontSize: 20, color: '#404040', marginTop: 20 }}>Tipo de Irrigação</Text>
                            <Text>Irrigação por {this.state.typeIrrigation === 'drip' ? 'gotejamento' : 'aspersão'}</Text>
                            <Text style={{ fontSize: 20, color: '#404040', marginTop: 20 }}>Vazão</Text>
                            <Text>Gotas por minuto: {this.state.dripMinute} gotas/min</Text>
                            <Text>Espaçamento entre gotejadores: {this.state.dripperSpacing} cm</Text>
                            <Text>Largura da linha: {this.state.rowWidth} cm</Text>
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


/* withDatabase pega o banco de dados onde quer que esteja */
export default connect(mapStateToProps, mapDispatchToProp)(withDatabase(StepEtc));


const styles = StyleSheet.create({

});