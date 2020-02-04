/*import {
    USER_TRY_TO_LOG_IN,
    USER_LOG_IN_SUCCESS,
} from '../constants';*/

const initialState = {
    isLoading: false,
    isEdited: false,
    error: null,
    article: {
        title: "",
        text: "",
    },
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        /*case USER_TRY_TO_LOG_IN:
            return {
                ...state,
            };

        case USER_LOG_IN_SUCCESS:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                user: action.user,
            };*/


        default:
            return state;
    }
}
