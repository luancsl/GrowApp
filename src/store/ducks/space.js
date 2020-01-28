import { createActions, createReducer } from 'reduxsauce';

/* Types and actions */
export const { Types, Creators } = createActions({
    addSpace: ['value'],
    getSpace: ['value'],
    decreaseTime: null,
});


/* Valaue init */
const INITIAL_STATE = [];


/* Functions Reducers */
const addSpace = (state = INITIAL_STATE, action) => [
    ...state,
    action.value
];

const decreaseTime = (state = INITIAL_STATE, action) => {
    return state.map((i) => {
        if (i.play) {
            return ({ ...i, currentTime: (i.currentTime > 0 ? i.currentTime - 1 : i.currentTime) });
        }
    })
};

const getSpace = (state = INITIAL_STATE, action) => state



/* Create reducers */
export default createReducer(INITIAL_STATE, {
    [Types.ADD_SPACE]: addSpace,
    [Types.GET_SPACE]: getSpace,
    [Types.DECREASE_TIME]: decreaseTime,
})