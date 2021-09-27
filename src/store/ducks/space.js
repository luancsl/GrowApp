import { createActions, createReducer } from 'reduxsauce';
import { Notification } from "@common";

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
            if (i.currentTime > 0) {
                const newValue = i.currentTime - 1;
                if (newValue === 0) {
                    Notification({
                        id: i.name,
                        culture: i.culture,
                        type: i.cultureType
                    });
                }
                return ({ ...i, currentTime: newValue });
            } else {
                return ({ ...i });
            }
        } else {
            return ({ ...i });
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