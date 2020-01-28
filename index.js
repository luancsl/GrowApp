
import { AppRegistry, ToastAndroid } from 'react-native';
import App from './src';
import React from 'react';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NativeModules } from 'react-native';
const { TimeController } = NativeModules;
import { Creators as SpaceActions } from "./src/store/ducks/space";

if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const timeController = async () => {
    ToastAndroid.showWithGravity('Receiving HeartBeat!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    store.dispatch(SpaceActions.decreaseTime());
};

const RNRedux = () => {
    TimeController.startService();
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
};

AppRegistry.registerHeadlessTask("timeController", () => timeController);
AppRegistry.registerComponent(appName, () => RNRedux);
