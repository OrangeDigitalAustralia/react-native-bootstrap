import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

// Analytics events are on by default.
firebase.analytics().setAnalyticsCollectionEnabled(true);

const Analytics = {
    previousScreen: null,
    instance: firebase,
    logEvent: (name, params) => firebase.analytics().logEvent(name, params),
    setUserId: userId => firebase.analytics().setUserId(userId),
    setUserProperty: (k, v) => firebase.analytics().setUserProperty(k, `${v}`),
    onScreenChanged: () => {
        // Dont log RNRF-generated wrapper scenes.
        if (Actions.currentScene.startsWith('page_key')) return;

        // Log screen opening event on Firebase Analytics if the current scene (just opened) is different than the previous.
        if (Actions.currentScene !== Analytics.previousScreen) {
            firebase.analytics().setCurrentScreen(Actions.currentScene);
            firebase.analytics().logEvent(`page_${Actions.currentScene}`);

            // Keep track of the previously opened screen.
            Analytics.previousScreen = Actions.currentScene;
        }
    }
};

const Properties = {
    CUSTOM_PROPERTY: 'property'
};

const Events = {
    SCREEN_CLOSED: 'screen_closed'
};

export default Analytics;
export { Events, Properties };
