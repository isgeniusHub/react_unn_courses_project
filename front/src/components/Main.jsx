import React from 'react';
import { connect } from "react-redux";
import Footer from './Footer';
import Header from './Header';
import Content from './Content';
import UsersContainer from './UsersContainer';
import ContactsList from './ContactsList';
import ArticlesContainer from './ArticlesContainer';
import Register from './Register';
import Login from './Login';
import Account from "./Account"
import Exit from './Exit';
import PageNotFound from "./PageNotFound";
import Preloader from "./Preloader";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {bindActionCreators} from "redux";
import userActions from "../actions/user";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    getPageComponent(pageId) {
        switch (pageId) {
            case "main":
                return <Content />;
            case "articles":
                return <ArticlesContainer />;
            case "users":
                return <UsersContainer />;
            case "contacts":
                return <ContactsList />;
            case "login":
                return <Login />;
            case "registration":
                return <Register />;
            case "account":
                return <Account />;
            case "exit":
                return <Exit onExit = { this.props.actions.onExit }/>
            default:
                return <PageNotFound />
        }
    }

    getRoute(pages){
        return pages.map((page) => {
            return (
                <Route
                    key = { page.pageId }
                    path = { page.path }
                    exact = { page.exact }
                    render = {
                        (props) => {
                            return this.getPageComponent(page.pageId);
                        }
                    }
                />
            );
        })
    }

    render() {
        return (
            <Router>
                <Header />
                <div className="container">
                    { this.props.isLoading && <Preloader/> }
                    <Switch>
                        { this.getRoute(this.props.pages) }
                        { this.getRoute(this.props.enterPages) }
                        { this.getRoute(this.props.accountPages) }
                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        pages: state.main.pages,
        accountPages: state.main.accountPages,
        enterPages: state.main.enterPages,
        isLoading: state.main.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators( userActions, dispatch )
    };
};

const Wrapped =
    connect(mapStateToProps, mapDispatchToProps)(Main);

export default Wrapped;

