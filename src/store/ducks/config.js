import { createActions, createReducer } from 'reduxsauce';

/* Types and actions */
export const { Types, Creators } = createActions({
    changeSearching: ['value'],
    noWelcome: [''],
    changeLanguage: ['value'],
    changeEto: ['value'],
    changeEquation: ['value'],
    changeCalcEto: ['value'],
    changeCalcEquation: ['value'],
    changeTypeMap: ['standard', 'stations', 'satellite'],
    getTypeMap: ['value'],
    getSearching: ['value'],
    changeHistoric: ['value'],
    getHistoric: [''],
    changeDefaultConfig: ['value']
});


/* Valaue init */
const INITIAL_STATE = {
    welcome: true,
    language: 'en_US',
    searching: false,
    eto: 3,
    newHistoric: false,
    equation: 'penman-monteith',
    defaultConfig: {
        service: 'inmet',
        type: 'station',
        equation: 'hargreaves-samani',
        distance: 60
    },
    calc: {
        eto: 3,
        equation: 'penman-monteith',
    },
    map: {
        standard: 0,
        stations: 1,
        satellite: 1,
    }
};


/* Functions Reducers */
const noWelcome = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        welcome: false
    }
};

const changeLanguage = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        language: action.value
    }
};

const changeEto = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        eto: action.value
    }
};
const changeEquation = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        equation: action.value
    }
};

const changeCalcEto = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        calc: { ...state.calc, eto: action.value }

    }
};
const changeCalcEquation = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        calc: { ...state.calc, equation: action.value }
    }
};

const changeTypeMap = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        map: {
            standard: action.standard,
            stations: action.stations,
            satellite: action.satellite
        }

    }
};

const getTypeMap = (state = INITIAL_STATE, action) => { return state.map };


const changeSearching = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        searching: action.value
    }
};

const getSearching = (state = INITIAL_STATE, action) => { return state.searching };


const changeHistoric = (state = INITIAL_STATE, action) => {
    return { ...state, newHistoric: action.value };
};

const getHistoric = (state = INITIAL_STATE, action) => {
    return state.newHistoric;
};

const changeDefaultConfig = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        defaultConfig: action.value
    }
};

/* Create reducers */
export default createReducer(INITIAL_STATE, {
    [Types.CHANGE_SEARCHING]: changeSearching,
    [Types.NO_WELCOME]: noWelcome,
    [Types.CHANGE_LANGUAGE]: changeLanguage,
    [Types.CHANGE_ETO]: changeEto,
    [Types.CHANGE_EQUATION]: changeEquation,
    [Types.CHANGE_CALC_ETO]: changeCalcEto,
    [Types.CHANGE_CALC_EQUATION]: changeCalcEquation,
    [Types.CHANGE_TYPE_MAP]: changeTypeMap,
    [Types.GET_TYPE_MAP]: getTypeMap,
    [Types.GET_SEARCHING]: getSearching,
    [Types.CHANGE_HISTORIC]: changeHistoric,
    [Types.GET_HISTORIC]: getHistoric,
    [Types.CHANGE_DEFAULT_CONFIG]: changeDefaultConfig
})