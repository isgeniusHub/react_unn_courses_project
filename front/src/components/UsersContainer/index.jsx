import React from 'react';
import axios from 'axios';
import UsersList from "../UsersList";
import User from "../User";
import PageNotFound from "../PageNotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
//import actions from '../../actions/user';

export default class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <Switch>
                <Route
                    path={'/users'}
                    exact
                    render={(props) => {
                        return (
                            <UsersList
                                { ...this.props }
                            />
                        );
                    }}
                />
                <Route
                    path={'/users/:userId'}
                    render={(props) => {
                        const userId = props.match.params.userId;
                        const selectedUser = this.props.users.find( user => user.userId === userId);
                        if(selectedUser) {
                            return (
                                <User
                                    { ...selectedUser }
                                    userId = { userId }
                                />
                            );
                        } else {
                            return <PageNotFound />
                        }
                    }}
                />
            </Switch>
        );
    }
}

/*
//Redux
const mapStateToProps = state => {
    return {
        ...state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
 */
