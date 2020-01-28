import spaceReducer from './space';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    spaceState: spaceReducer
});