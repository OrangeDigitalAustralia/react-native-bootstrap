import Rate, { AndroidMarket } from 'react-native-rate';
import DeviceInfo from 'react-native-device-info';
import { Alert, Platform } from 'react-native';

import Constants from '../config/constants';
import Storage from './async-storage';

const AppleAppID = '757435481';
const GooglePackageName = DeviceInfo.getBundleId();

const rateOptions = {
    AppleAppID,
    GooglePackageName,
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    openAppStoreIfInAppFails: false,
};

/*
    This library makes it easier to ask for your user's feedback. Remember to follow good practices when doing so:
    https://play.google.com/about/storelisting-promotional/ratings-reviews-installs/
    https://developer.apple.com/app-store/ratings-and-reviews/

    Simply call the "promptAppRating" function to start the process.

    On iOS:
        The native Rating Alert (iOS10) is opened and the user can rate the app without leaving it.
    On Android:
        You're free to customise the way you ask for ratings. An example is provided below where 2
        alerts are used to confirm whether the user wants to review the app or not. At the end of
        the process, he'll be redirected to your app's page on Play Store.
*/
const AppRating = {
    displayRatingTriagePopup: () => {
        Alert.alert(
            'Hello!',
            'Are you liking the app?',
            [{
                text: 'Yes',
                onPress: AppRating.displayRateNowPopup
            }, {
                text: 'No',
                onPress: AppRating.saveLastUserRatingVersion,
                style: 'destructive'
            }],
            { cancelable: false }
        );
    },
    displayRateNowPopup: () => {
        Alert.alert(
            'Thank you',
            'Do you want to take a moment and rate the app ?',
            [{
                text: 'Rate now',
                onPress: AppRating.rateApp
            }, {
                text: 'Later',
            }, {
                text: 'Not really',
                onPress: AppRating.saveLastUserRatingVersion,
                style: 'destructive'
            }],
            { cancelable: false }
        );
    },
    // We save the latest version number used to rate this app.
    saveLastUserRatingVersion: async () => Storage.setItem(Constants.LAST_USER_RATING_VERSION, `${DeviceInfo.getBuildNumber()}`),
    // Here we check if the current app version number equals the last saved rating version
    hasUserRatedThisVersion: async () => {
        const lastRatingVersion = await Storage.getItem(Constants.LAST_USER_RATING_VERSION);

        if (lastRatingVersion) {
            return lastRatingVersion === `${DeviceInfo.getBuildNumber()}`;
        }

        return false;
    },
    promptAppRating: async () => {
        if (!__DEV__ && await AppRating.hasUserRatedThisVersion()) return;

        if (Platform.OS === 'android') {
            AppRating.displayRatingTriagePopup();
        } else {
            AppRating.rateApp();
        }
    },
    rateApp: async () => {
        await AppRating.saveLastUserRatingVersion();

        // On iOS, brings up the native rating popup.
        // On Android, launches the play store URL for this app.
        Rate.rate(rateOptions);
    }
};

export default AppRating;
