
import update from 'react-addons-update';
import { START_FEED_LOADING, SUCCESS_FEED_LOADING, ERROR_FEED_LOADING } from './../actions/feed';
import { START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING } from './../actions/makePost';


const initialState = {
    feedList: [],
    isLoading: false,
};

export default function feed(store = initialState, action) {
    let newStore = store;

    switch (action.type) {
        case START_FEED_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_FEED_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                feedList: { $set: action.payload },
            });
        }
        case ERROR_FEED_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }

        case SUCCESS_POST_LOADING: {
            return update(newStore, {
                feedList: {$merge: action.payload},
            })
        }

        default:
            return newStore;
    }
}