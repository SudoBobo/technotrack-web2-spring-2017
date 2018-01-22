import update from 'react-addons-update';
import { START_AUTH, SUCCESS_AUTH, ERROR_AUTH } from './../actions/auth';

const initialState = {
    isLoading: false,
    isLogin: false
};

export default function feed(store = initialState, action) {
    let newStore = store;

    switch (action.type) {
        case START_AUTH: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_AUTH: {
            localStorage.setItem('token', action.payload.token);
            return update(newStore, {
                isLoading: { $set: false },
                isLogin: { $set: true}
            });
        }
        case ERROR_AUTH: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        default:
            return newStore;
    }
}