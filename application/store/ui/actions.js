import { Alert } from 'react-native';
import UIActionTypes from './types';

const enableLoading = () => ({
    type: UIActionTypes.ENABLE_LOADING,
});

const disableLoading = () => ({
    type: UIActionTypes.DISABLE_LOADING,
});

const updateKeyboardHeight = height => ({
    type: UIActionTypes.UPDATE_KEYBOARD_HEIGHT,
    payload: { height }
});

const displayAlert = (params) => {
    Alert.alert(
        params.title,
        params.text,
        params.buttons || []
    );
};

export {
    enableLoading,
    displayAlert,
    disableLoading,
    updateKeyboardHeight
};
