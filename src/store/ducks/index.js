import spaceReducer from './space';
import configReducer from './config';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    spaceState: spaceReducer,
    configState: configReducer
});