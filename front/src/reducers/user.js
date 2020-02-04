import {
    USER_TRY_TO_LOG_IN,
    USER_LOG_IN_SUCCESS,
    USER_LOG_OUT,
    USER_TRY_TO_LOAD_ACCOUNT,
    USER_LOAD_ACCOUNT_SUCCESS,
    USER_LOAD_ACCOUNT_FAILED,
    USER_TRY_TO_SAVE_ACCOUNT,
    USER_SAVE_ACCOUNT_SUCCESS,
    USER_SAVE_ACCOUNT_FAILED,
    USER_TRY_TO_EDIT_ACCOUNT,
    USER_TRY_TO_DELETE_ACCOUNT,
    USER_DELETE_ACCOUNT_SUCCESS,
    USER_DELETE_ACCOUNT_FAILED,
    GET_USERS_SUCCESS,
    GET_USERS_LOADING,
    GET_USERS_FAILED,
} from '../constants';


const initialState = {
    isLoading: false,
    isLoggedIn: false,
    isEdited: false,
    user: {},
    users: [],
    error: null,
    accountFields: [
        { label: "Администратор", type: "checkbox", name: "isAdmin", onlyAdminEdit: true, tag: "input" },
        { label: "Имя",  type: "text",  name: "name", tag: "input" },
        { label: "Логин", type: "text", name: "login", tag: "input" },
        { label: "Почта", type: "email", name: "email", tag: "input" },
        { label: "Дата рождения", type: "date", name: "birthDate", tag: "input" },
        { label: "Город", type: "text", name: "city", tag: "input" },
        { label: "О себе", type: "text", name: "about", tag: "textarea" },
        { label: "Новый пароль", type: "password", name: "password", onlyInEdit: true, tag: "input" },
    ]
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_TRY_TO_LOG_IN:
            return {
                ...state,
                isLoading: true,
            };

        case USER_LOG_IN_SUCCESS:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                user: action.user,
                isLoading: false,
            };

        case USER_LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                isLoading: false,
            };

        case USER_TRY_TO_EDIT_ACCOUNT:
            return {
                ...state,
                isEdited: action.isEdited,
            };

        case USER_TRY_TO_LOAD_ACCOUNT:
            return {
                ...state,
                isLoading: true,
            };

        case USER_LOAD_ACCOUNT_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoading: false,
            };

        case USER_LOAD_ACCOUNT_FAILED:
            return {
                ...state,
                errMsg: action.errMsg,
                isLoading: false,
            };

        case USER_TRY_TO_SAVE_ACCOUNT:
            return {
                ...state,
                isLoading: true,
                isEdited: true,
            };

        case USER_SAVE_ACCOUNT_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoading: false,
                isEdited: false,
            };

        case USER_SAVE_ACCOUNT_FAILED:
            return {
                ...state,
                errMsg: action.errMsg,
                isLoading: false,
                isEdited: false,
            };

        case USER_TRY_TO_DELETE_ACCOUNT:
            return {
                ...state,
                isLoading: true,
            };

        case USER_DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                isLoading: false,
            };

        case USER_DELETE_ACCOUNT_FAILED:
            return {
                ...state,
                errMsg: action.errMsg,
                isLoading: false,
            };

        case GET_USERS_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                isLoading: false,
            };

        case GET_USERS_FAILED:
            return {
                ...state,
                errMsg: action.errMsg,
                isLoading: false,
            };

        default:
            return state;
    }
}
