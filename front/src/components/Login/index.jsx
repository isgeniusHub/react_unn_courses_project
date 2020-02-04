import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import AlreadyLogged from "../AlreadyLogged";
import InputField from "../InputField";
import { bindActionCreators } from "redux";
import userActions from "../../actions/user";
import mainActions from "../../actions/main";

/*TODO:
* реализовать авторизацию с токеном
* */

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.loginInput = React.createRef();
        this.state = {
            inputs: [
                { type: "text", name: "login", placeholder: "Логин или e-mail", referer: this.loginInput },
                { type: "password", name: "password", placeholder: "Пароль" },
            ]
        };

        this.makeTextInputFocused = this.makeTextInputFocused.bind(this);
    }

    makeTextInputFocused() {
        this.loginInput.current.focus();
    }

    componentDidMount() {
        this.makeTextInputFocused();
    }

    render() {
        return (
            <div>
                <h1>Вход</h1>
                <div>
                    {
                        !this.props.isLoggedIn
                            ?
                           <div className="login-form">
                               <div className="login-row">
                                   {
                                       this.state.inputs.map( (input,i) => {
                                           return (
                                               <InputField
                                                   key = {i}
                                                   {...input}
                                                   stateKey = "user"
                                                   defaultValue = ""
                                                   inputChange = { this.props.mainActions.inputChange }
                                                   renderError = { this.props.mainActions.renderError }
                                               />
                                           );
                                       })
                                   }
                               </div>
                               <div className="login-row">
                                    <button onClick = { this.props.userActions.onLogin }>
                                        Войти
                                    </button>
                               </div>
                               <div className="login-row">
                                    <button>
                                        <Link to="/registration" className="btn-link">
                                            Зарегистрироваться
                                        </Link>
                                    </button>
                               </div>
                           </div>
                            :
                            <AlreadyLogged onExit={ this.props.userActions.onExit }/>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        mainActions: bindActionCreators(mainActions, dispatch),
    };
};

const Wrapped =
    connect(mapStateToProps, mapDispatchToProps)(Login);

export default Wrapped;

