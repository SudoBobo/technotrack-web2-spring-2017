import {CALL_API, getJSON} from 'redux-api-middleware';

export const START_FEED_LOADING = 'START_FEED_LOADING';
export const SUCCESS_FEED_LOADING = 'SUCCESS_FEED_LOADING';
export const ERROR_FEED_LOADING = 'ERROR_FEED_LOADING';

export const loadFeed = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            types: [
                START_FEED_LOADING,
                {
                    type: SUCCESS_FEED_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return Object.assign([], json);
                            },
                        );
                    },
                },
                ERROR_FEED_LOADING,
            ],
        },
    };
};