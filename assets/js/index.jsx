import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import App from './App';
import initStore from './utils/store';

import '../style/style.css'

const history = createHistory();
const middleware = routerMiddleware(history);

ReactDOM.render(
    <Provider store={ initStore([middleware]) }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);