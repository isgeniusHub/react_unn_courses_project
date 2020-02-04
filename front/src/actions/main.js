import * as c from '../constants';
import axios from 'axios';

const actions = {
    inputChange(value) {
        return (dispatch, getStore) => {
           const store = getStore();

           let key, newVal;
            if (value.target.dataset.stateKey) {
                key = value.target.dataset.stateKey;
                newVal = {};
                if (store.main[key]) {
                    newVal = JSON.parse(JSON.stringify(store.main[key]));
                }
                newVal[value.target.name] = value.target.value;
            } else {
                key = value.target.name;
                newVal = value.target.value;
            }

            dispatch({
                type: c.INPUT_CHANGED,
                error: null,
                [key]: newVal,
                stateKey: value.target.dataset.stateKey
            });

        }
    },
    fetchContent() {
        return async (dispatch, getStore) => {
            const store = getStore();
            dispatch({
                type: c.GET_MAIN_CONTENT_LOADING,
                isLoading: true,
            });

            try {
                const usersLastResponse = await axios.get('http://localhost:7000/user/last');
                const articlesLastResponse = await axios.get('http://localhost:7000/articles?last=true');
                const articlesPopularResponse = await axios.get('http://localhost:7000/articles?popular=true');

                dispatch({
                    type: c.GET_MAIN_CONTENT_SUCCESS,
                    contentBlocks: [
                        {
                            stateKey: "article",
                            title: "Последние публикации",
                            items: articlesLastResponse.data,
                            href: "/articles"
                        },
                        {
                            stateKey: "article",
                            title: "Лучшие статьи",
                            items: articlesPopularResponse.data,
                            href: "/articles"
                        },
                        {stateKey: "user", title: "Новые пользователи", items: usersLastResponse.data, href: "/users"},
                    ],
                });

            } catch (e) {
                this.catchError(e);
                dispatch({
                    type: c.GET_MAIN_CONTENT_FAILED,
                    errMsg: e.message,
                });
            }
        }
    },
    /* formatDate(str){
         const date = new Date(str);
         const dateMonth = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
         const dateDay = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
         return date.getFullYear() + "-" + dateMonth + "-" + dateDay;
     }
     /*
     catchError(err){
         if("validation" in err.response.data) {
             err.response.data.validation.keys.map(item =>
                 this.setState({
                     error: { [item]: err.response.data.message },
                 })
             );
         } else {
             this.setState({
                 error: err.response.data.message,
             })
         }
         console.error(err);
     }

     renderError(field){
         let err = "";
         switch (typeof this.state.error){
             case "object":
                 err = (this.state.error!==null && (field in this.state.error)) ? this.state.error[field] : "";
                 break;
             case "string":
                 err = this.state.error;
                 break;
             default:
                 err = "";
         }

         if(err) {
             return <span className="error">{ err }</span>;
         }

         return null;
     }
     */

};

export default actions;