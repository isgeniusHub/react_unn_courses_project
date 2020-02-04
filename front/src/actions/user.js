import * as c from '../constants';
import axios from 'axios';

const actions = {
    onLogin() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.USER_TRY_TO_LOG_IN,
                isLoading: true,
            });

            try {
                const response = await axios.post(
                    'http://localhost:7000/user/login',
                    store.main.user
                );

                dispatch({
                    type: c.USER_LOG_IN_SUCCESS,
                    isLoggedIn: true,
                    user: response.data,
                    isLoading: false,
                });
            } catch (e) {
                this.catchError(e);
                dispatch({
                    type: c.USER_LOG_IN_FAILED,
                    errMsg: e.message,
                    isLoggedIn: false,
                    isLoading: false,
                });
            }
        }
    },
    fetchUsers(userId = "") {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.GET_USERS_LOADING,
                isLoading: true,
            });

            try {
                const url = (userId) ? 'http://localhost:7000/user/' + userId : 'http://localhost:7000/user/';
                const response = await axios.get(url);
                dispatch({
                    type: c.GET_USERS_SUCCESS,
                    users: response.data,
                    isLoading: false,
                });
            } catch (e) {
                this.catchError(e);
                dispatch({
                    type: c.GET_USERS_FAILED,
                    errMsg: e.message,
                    isLoading: false,
                });
            }
        };
    },
    onExit() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.USER_LOG_OUT,
                isLoggedIn: false,
                user: {},
                error: null,
                isEdited: false,
            });
        }
    },
    editAccount(){
        return (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.USER_TRY_TO_EDIT_ACCOUNT,
                isEdited: !store.user.isEdited,
            });
        }
    },
    getUser(){
        return async(dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.USER_TRY_TO_LOAD_ACCOUNT,
                isLoading: true,
            });
            try {
                const response = await axios.get(
                    'http://localhost:7000/user/info/' + store.user.user.userId,
                    {
                        headers: {'Authorization': 'Bearer ' + store.user.user.token},
                    }
                );

                let user = Object.assign(response.data);
                const date = new Date(user.birthDate);
                const dateMonth = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
                const dateDay = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
                user.birthDate = date.getFullYear() + "-" + dateMonth + "-" + dateDay;

                dispatch({
                    type: c.USER_LOAD_ACCOUNT_SUCCESS,
                    user: user,
                    isLoading: false,
                });

            } catch (e) {
                this.catchError(e);
                dispatch({
                    type: c.USER_LOAD_ACCOUNT_FAILED,
                    errMsg: e.message,
                    isLoading: false,
                });
            }
        }
    },
    deleteAccount (){
        return async(dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.USER_TRY_TO_DELETE_ACCOUNT,
                isLoading: true,
            });
            try {
                const response = await axios.delete(
                    'http://localhost:7000/user/delete/' + store.user.user.userId,
                    {
                        headers: {'Authorization': 'Bearer ' + store.user.user.token},
                    }
                );

                dispatch({
                    type: c.USER_DELETE_ACCOUNT_SUCCESS,
                    users: {},
                    isLoggedIn: false,
                    isLoading: false,
                });
            } catch (e) {
                this.catchError(e);
                dispatch({
                    type: c.USER_DELETE_ACCOUNT_FAILED,
                    errMsg: e.message,
                    isLoading: false,
                });
            }
        }
    },






    /*

    async onRegister(e) {
        e.preventDefault();

        this.setState({
            isLoading: true,
        });

        try {
            const response = await axios.post(
                'http://localhost:7000/user/register',
                this.state.user
            );

            let newUser = this.state.user;
            newUser.token = response.data.token;
            newUser.userId = response.data.userId;

            this.setState({
                isLoggedIn: true,
                user: newUser
            });

        } catch (e) {
            this.catchError(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }
*/


    saveUserChanges(){
        return async(dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.USER_TRY_TO_SAVE_ACCOUNT,
                isLoading: true,
            });
console.log("store.main.user ",store.main.user );
            try {
                const response = await axios.put(
                    'http://localhost:7000/user/change/' + store.user.user.userId,
                     store.main.user,
                    {
                        headers: {'Authorization': 'Bearer ' + store.user.user.token},
                    }
                );

                dispatch({
                    type: c.USER_SAVE_ACCOUNT_SUCCESS,
                    user: { userId: response.data.userId },
                    isLoading: false,
                    isEdited: false,
                });
                this.getUser();
            } catch (e) {
                this.catchError(e);
                dispatch({
                    type: c.USER_SAVE_ACCOUNT_FAILED,
                    errMsg: e.message,
                    isLoading: false,
                    isEdited: false,
                });
            }
        }
    }
};

export default actions;
