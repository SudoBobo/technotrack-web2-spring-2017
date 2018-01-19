import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

export const logger1 = store => next => (action) => {
    console.log('dispatching 1', action);
    return next(action);
};


// next(action) в данном случае вызовет второй логгер
export const logger2 = store => next => (action) => {
    console.log('dispatching 2', action);
    return next(action);
};
// редьюсеры могут ветвиться для разделения логики (пост-редюсер, коммент-редюсер)
// при этом все экшоны проходят через все редюсеры
// и это хорошо
// default params
const itemsReducer = (store = {someItems: []}, action) => {

    switch (action.type) {
        case 'CREATE_TASK':
            return {someItems: [action.payload, ...store.someItems]};
        default:
            return store;
    }
};

const userReducer = (store = {userItems: []}, action) => {
    return store;
};

const reducer = combineReducers({
    items: itemsReducer,
    users: userReducer
});


// его передаёт сервер при сервер-рендеринге
const initialStore = { };

const middlewares = applyMiddleware(logger1, logger2);
// compose собирает в себе все усилители
// усилители изменяют стор
// мидлвейрс изменяют функцию диспатч
const store = createStore(reducer, initialStore, compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__()));

// принимает функцию, которая будет вызываться каждый раз, когда произойдут
// изменения

// в didMount компонента делаешь сабскрайб
// и если произошло нужно изменение в сторе
// меняешь свой стейт
// на практике так делать не нужно, т.к. есть обёрта react-redux
store.subscribe(
    () => {
        console.log('subscriber 1', store.getState())
    }
)

store.subscribe(
    () => {
        console.log('subscriber 2', store.getState())
    }
)
store.dispatch({type: 'CREATE_TASK', payload: 'NEW TASK'});


// Middleware - набор функций, через которые проходит каждый экшон,
// Попадающий в редюсер. Можно логировать, запрещать определённый экшоны,
// Изменять экшоны, заменять их, добавлять к исходному ещё новые
