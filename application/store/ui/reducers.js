import { Dimensions } from 'react-native';
import UIActionTypes from './types';

const INITIAL_STATE = {
    loading: false,
    keyboardHeight: 0,
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UIActionTypes.ENABLE_LOADING:
            return { ...state, loading: true };
        case UIActionTypes.DISABLE_LOADING:
            return { ...state, loading: false };
        case UIActionTypes.UPDATE_KEYBOARD_HEIGHT:
            return { ...state, keyboardHeight: action.payload.height };
        default:
            return state;
    }
};
