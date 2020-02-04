import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import mainReducer from './main';
import userReducer from './user';

export default function rootReducer(history) {
    return combineReducers({
        user: userReducer,
        main: mainReducer,
        router: connectRouter(history),
    });
}
