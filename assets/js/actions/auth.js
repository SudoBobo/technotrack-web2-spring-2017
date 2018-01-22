import {RSAA, CALL_API, getJSON} from 'redux-api-middleware';

export const START_AUTH = 'START_AUTH';
export const SUCCESS_AUTH = 'SUCCESS_AUTH';
export const ERROR_AUTH= 'ERROR_AUTH';

export const doAuth = (url, login, password) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'login': login, 'password': password
            },
            types: [
                START_AUTH,
                {
                    type: SUCCESS_AUTH,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return Object.assign([], json);
                            },
                        );
                    },
                },
                ERROR_AUTH,
            ],
        },
    };
};