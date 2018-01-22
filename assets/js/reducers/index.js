import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import feed from '../reducers/feed';
import auth from '../reducers/auth';

export default combineReducers({
    routerReducer,
    feed,
    auth,
});