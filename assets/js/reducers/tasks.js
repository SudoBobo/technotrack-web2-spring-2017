import {ERROR_TASK_LOADING, START_TASK_LOADING, SUCCESS_TASK_LOADING,} from '../actions/tasks'
import update from 'react-addons-update';

const initialState = {
    taskList: [],
    isLoading: false,
};


export default function tasks(store = initialState, action) {
    switch (action.type) {
        case START_TASK_LOADING: {
            // return Object.assign({}, store, { isLoading: true});
            return update(store, {
                // $merge (merge objects)
                isLoading: {$set: true},
                // чтобы поменять, например
                // четвёртый таск
                // taskList: {
                // [4]: { $merge: {newDict: newTask}}
                //           }
            });
        }

        case SUCCESS_TASK_LOADING: {
            return update(store, {
                isLoading: {$set: false},
                taskList: {$set: action.payload}

            })
        }

        case ERROR_TASK_LOADING: {
            return update(store, {
                isLoading: {$set: false},
            })
        }

        default:
            return store;
    }
}