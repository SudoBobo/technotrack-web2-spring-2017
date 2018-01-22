import {CALL_API, getJSON} from 'redux-api-middleware';

export const START_POST_LOADING = 'START_POST_LOADING';
export const SUCCESS_POST_LOADING = 'SUCCESS_POST_LOADING';
export const ERROR_POST_LOADING = 'ERROR_POST_LOADING';

export const makePost = (url, title, text) => {

    console.log(title + " " + text);
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: {
                'title': title, 'text': text
            },

            types: [
                START_POST_LOADING,
                {
                    type: SUCCESS_POST_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                return Object.assign([], json);
                            },
                        );
                    },
                },
                ERROR_POST_LOADING,
            ],
        },
    };
};