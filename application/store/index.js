import { combineReducers } from 'redux';
import ui from './ui/reducers';

export default combineReducers({
    ui
});

export * from './ui/actions';
