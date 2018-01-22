import {CALL_API, getJSON} from 'redux-api-middleware';

export const START_FEED_ELEMENT_LOADING = 'START_FEED_ELEMENT_LOADING';
export const SUCCESS_FEED_ELEMENT_LOADING = 'SUCCESS_FEED_ELEMENT_LOADING';
export const ERROR_FEED_ELEMENT_LOADING = 'ERROR_FEED_ELEMENT_LOADING';


export const loadFeedElement = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_FEED_ELEMENT_LOADING,
                {
                    type: SUCCESS_FEED_ELEMENT_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return Object.assign({}, json, json.results);
                            },
                        );
                    },
                },
                ERROR_FEED_ELEMENT_LOADING,
            ],
        },
    };
};