import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// можно взять с гитхаба курса
import tasks from './tasks';
// import users from './users';


export default combineReducers({
    // routerReducer,
    tasks,
    // users,
});