import React from 'react';
import account from "../../img/accountWhite.png";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuHidden: true,
        };

        this.getUserMenu = this.getUserMenu.bind(this);
        this.showUserMenu = this.showUserMenu.bind(this);
    }

    showUserMenu(e){
        this.setState({
            menuHidden: !this.state.menuHidden,
        });
    }

    getUserMenu(){
        return (
            <div>
                {
                    !this.state.menuHidden
                    &&
                    <ul className="account-menu">
                        {
                            this.props.accountPages.map((obj,i) => {
                                return (
                                    <li key={i}>
                                        <Link to={ obj.path }>{ obj.name }</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                }
            </div>
        );
    }

    render() {console.log(this.props);
        return (
            <header>
                <div className="container">
                    <ul className="header-column">
                        {
                            this.props.pages.map((obj) => {
                                return (
                                    <li key={ obj.pageId }>
                                        <Link to={ obj.path } className="link">{ obj.name }</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <h4 className="header-column">
                        <Link to="/" className="logo">IsGenius</Link>
                    </h4>
                    <div className="header-column">
                        {
                            this.props.isLoggedIn
                                ?
                                <div className="user-menu link"
                                     onClick={ (e) => this.showUserMenu(e) }>
                                    <span className="login">
                                        { this.props.user.name }
                                    </span>
                                    <img src={ account }/>
                                    { this.getUserMenu() }
                                </div>
                                :
                                <Link to="/login" className="link">
                                    Вход
                                </Link>
                        }
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user,
        pages: state.main.pages,
        accountPages: state.main.accountPages,
        enterPages: state.main.enterPages,
    };
};

export default connect(mapStateToProps, null)(Header);
