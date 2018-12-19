import React, { Component } from 'react';
import {
    Platform,
    TouchableNativeFeedback,
    Keyboard,
    StatusBar,
    TextInput,
    TouchableOpacity,
    UIManager,
    YellowBox
} from 'react-native';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import codePush from 'react-native-code-push';
import { createStore, applyMiddleware } from 'redux';

import reducers, { updateKeyboardHeight } from './store';
import Router from './config/router';

require('core-js/es6/array');

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(ReduxThunk),
);
/* eslint-enable */

const codePushOptions = {
    updateDialog: true,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE
};

class App extends Component {
    componentWillMount() {
        // Configure global keyboard listener
        Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);

        // Change default textinput props
        TextInput.defaultProps.autoCorrect = false;
        TextInput.defaultProps.spellCheck = false;

        // Changes default button "clicked" state opacity.
        TouchableOpacity.defaultProps.activeOpacity = 0.6;

        // Disables accessible bigger fonts.
        // Text.defaultProps.allowFontScaling = false;

        // In order to get LayoutAnimation to work on Android we need to call the following method
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        YellowBox.ignoreWarnings([
            'Warning: isMounted(...) is deprecated',
            'is not supported on Android',
            'Overriding previous',
            'Require cycles'
        ]);

        // Set the StatusBar color to white on Android
        if (Platform.OS === 'android') {
            if (Platform.Version < 21) {
                TouchableNativeFeedback.Ripple = TouchableNativeFeedback.SelectableBackground;
            }

            StatusBar.setNetworkActivityIndicatorVisible = () => {};
        }
    }

    keyboardDidShow(e) {
        store.dispatch(updateKeyboardHeight(e.endCoordinates.height));
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default codePush(codePushOptions)(App);
export { store };
