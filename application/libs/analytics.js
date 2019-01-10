import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

firebase.analytics().setAnalyticsCollectionEnabled(true);

const Analytics = {
    previousScreen: null,
    instance: firebase,
    logEvent: (name, params) => firebase.analytics().logEvent(name, params),
    setUserId: userId => firebase.analytics().setUserId(userId),
    setUserProperty: (k, v) => firebase.analytics().setUserProperty(k, `${v}`),
    onScreenChanged: () => {
        if (Actions.currentScene.startsWith('page_key')) return;

        if (Actions.currentScene !== Analytics.previousScreen) {
            firebase.analytics().setCurrentScreen(Actions.currentScene);
            firebase.analytics().logEvent(`page_${Actions.currentScene}`);

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
