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

import { UpdateProgressDialog } from './components';
import reducers, { updateKeyboardHeight } from './store';
import Router from './config/router';

require('core-js/es6/array');

const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk),
);

const codePushOptions = {
    updateDialog: true,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE
};

class App extends Component {
    constructor() {
        super();

        this.state = {
            updating: false,
            updateProgress: ''
        };
    }

    codePushStatusDidChange(status) {
        switch (status) {
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ updating: true });
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({ updating: false });
                break;
            default:
                break;
        }
    }

    codePushDownloadDidProgress({ receivedBytes, totalBytes }) {
        this.setState({
            updateProgress: `Updating... ${parseInt((receivedBytes / totalBytes) * 100)}%`
        });
    }

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
                <UpdateProgressDialog
                    loading={this.state.updating}
                    text={this.state.updateProgress}
                />
            </Provider>
        );
    }
}

export default codePush(codePushOptions)(App);
export { store };
