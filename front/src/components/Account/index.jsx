import React from 'react';
import './account.css';
import Login from "../Login";
import InputField from "../InputField";
import TextareaField from "../Textarea";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import userActions from "../../actions/user";
import mainActions from "../../actions/main";

/*TODO:
* пофиксить отображение ошибок
* пофиксить эффект после удаления акка
* добавить посты юзера, редактирование постов юзера
*/

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getUser();
    }

    render() {
        return (
            <div>
                {
                    this.props.isLoggedIn
                        ?
                        <div className="account">
                            <div className="account-header">
                                <h1>Профиль пользователя</h1>
                                <div>
                                    <button onClick={ !this.props.isEdited ? this.props.actions.editAccount :  this.props.actions.saveUserChanges }>
                                        { !this.props.isEdited ? "Редактировать" :  "Сохранить" }
                                    </button>
                                    {
                                        this.props.isEdited
                                        &&
                                        <button onClick={ this.props.actions.editAccount }>Отмена</button>
                                    }
                                    <button onClick={ this.props.actions.deleteAccount }>Удалить аккаунт</button>
                                </div>
                            </div>
                            {
                                this.props.accountFields.map( (field,i) => {
                                    if(field.tag === "input") {
                                        return (
                                            <InputField
                                                key = {i}
                                                { ...field }
                                                stateKey = "user"
                                                user = { this.props.user }
                                                isEdited = { this.props.isEdited }
                                                inputChange = { this.props.main.inputChange }
                                                error = { this.props.error }
                                                renderError = { this.props.main.renderError }
                                            />
                                        );
                                    } else if(field.tag === "textarea"){
                                        return (
                                            <TextareaField
                                                key = {i}
                                                { ...field }
                                                stateKey = "user"
                                                user = { this.props.user }
                                                isEdited = { this.props.isEdited }
                                                inputChange = { this.props.main.inputChange }
                                                error = { this.props.error }
                                                renderError = { this.props.main.renderError }
                                            />
                                        );
                                    }
                                })
                            }
                        </div>
                        :
                        <Login />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accountFields: state.user.accountFields,
        isLoading: state.user.isLoading,
        isEdited: state.user.isEdited,
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user,
        error: state.user.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch),
        main: bindActionCreators(mainActions, dispatch)
    };
};

const Wrapped =
    connect(mapStateToProps, mapDispatchToProps)(Account);

export default Wrapped;