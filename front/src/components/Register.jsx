import React from 'react';
import AlreadyLogged from "./AlreadyLogged"
import InputField from "./InputField";

/*
* TODO
*  при регистрации не передается токен
* */
export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: [
                { type: "text", name: "name", placeholder: "*Введите имя", required: true },
                { type: "date", name: "birthDate", placeholder: "*Дата рождения", required: true },
                { type: "email", name: "email", placeholder: "*E-mail", required: true },
                { type: "password", name: "password", placeholder: "*Пароль", required: true },
                { type: "password", name: "repeatPassword", placeholder: "*Повторите пароль", required: true },
            ]
        };

    }

    render() {
        return (
            <div>
                <h1>Регистрация</h1>
                {
                    !this.props.isLoggedIn
                        ?
                        <form>
                            <div className="login-row">
                                {
                                    this.state.inputs.map( (input,i) => {
                                        return (
                                            <InputField
                                                key = {i}
                                                {...input}
                                                stateKey = "user"
                                                defaultValue = ""
                                                inputChange = { this.props.inputChange }
                                                renderError = { this.props.renderError }
                                            />
                                        );
                                    })
                                }
                            </div>
                            <button onClick={ this.props.onRegister }>
                                Зарегистрироваться
                            </button>
                        </form>
                        :
                        <AlreadyLogged onExit={ this.props.onExit } />
                }
            </div>
        );
    }
}
