import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import feed from '../reducers/feed';

export default combineReducers({
    routerReducer,
    feed
});