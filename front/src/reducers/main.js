import {
    INPUT_CHANGED,
    GET_MAIN_CONTENT_LOADING,
    GET_MAIN_CONTENT_SUCCESS,
    GET_MAIN_CONTENT_FAILED
} from '../constants';
import email from "../img/emailWhite.png";
import phone from "../img/phoneWhite.png";
import whatsapp from "../img/whatsappWhite.png";
import telegram from "../img/telegramWhite.png";

const initialState = {
    isLoading: false,
    error: null,
    contentBlocks: [],
    pages: [
        { pageId: "main", name: 'Главная', path: "/" , exact: true },
        { pageId: "articles", name: 'Статьи', path: "/articles" , exact: false },
        { pageId: "users", name: 'Пользователи', path: "/users" , exact: false },
        { pageId: "contacts", name: 'Контакты', path: "/contacts" , exact: false },
    ],
    accountPages: [
        { pageId: "account", name: 'Управление аккаунтом', path: "/account" , exact: false  },
        { pageId: "exit", name: 'Выйти', path: "/exit" , exact: false },
    ],
    enterPages: [
        { pageId: "login", name: 'Вход', path: "/login" , exact: false },
        { pageId: "registration", name: 'Регистрация', path: "/registration" , exact: false },
    ],
    contacts: [
        { href: "mailto:admin@admin.ru", title: "Электронная почта", src: email },
        { href: "tel:+79000000000", title: "Мобильный телефон", src: phone },
        { href: "https://wa.me/79000000000", title: "Контакт Whatsapp", src: whatsapp },
        { href: "tg://resolve?domain=telegramlogin", title: "Контакт Telegram", src: telegram },
    ],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case INPUT_CHANGED:
            return {
                ...state,
                [action.stateKey]: action[action.stateKey]
            };

        case GET_MAIN_CONTENT_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case GET_MAIN_CONTENT_SUCCESS:
            return {
                ...state,
                contentBlocks: action.contentBlocks,
                isLoading: false,
            };
        case GET_MAIN_CONTENT_FAILED:
            return {
                ...state,
                error: action.errMsg,
                isLoading: false,
            };
        default:
            return state;
    }
}
