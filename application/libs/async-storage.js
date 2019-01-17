import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

const module = {
    cache: {

    },
    getItem: async (key, defaultValue) => {
        let result;

        if (module.cache[key]) {
            return module.cache[key];
        }

        try {
            result = await AsyncStorage.getItem(key);

            if (result && result.startsWith('json:')) {
                result = JSON.parse(result.slice(5));
            }

            module.cache[key] = result;
        } catch (error) {
            result = error;
        }

        return result || defaultValue;
    },
    setItem: async (key, value) => {
        try {
            // Hack to allow storing objects
            if (typeof value === 'object') {
                await AsyncStorage.setItem(key, `json:${JSON.stringify(value)}`);
            } else {
                await AsyncStorage.setItem(key, value);
            }


            module.cache[key] = value;
        } catch (error) {
            firebase.crashlytics().recordError(1001, `Error while setting storage key ${key}.`);
        }
    },
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            delete module.cache[key];
        } catch (error) {
            firebase.crashlytics().recordError(1001, `Error while removing storage key ${key}.`);
        }
    }
};

export default module;
