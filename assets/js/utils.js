import {createStore, applyMiddleware, compose} from 'redux';
import {Switch, Route, Link} from 'react-router-dom'


import initReducers from './reducers';
import middlewares from './middlewares';

export function printText(text) {
    console.log(`Text: ${text}`);
}

export const test = 'Привет!';


export function initStore(additionalMiddlewares = []) {
    const innitialStore = {};
    return createStore(
        initReducers,
        innitialStore,
        compose(
            applyMiddleware(...additionalMiddlewares, ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
}