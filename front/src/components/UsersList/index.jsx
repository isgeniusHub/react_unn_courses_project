import React from 'react';
import { Link } from "react-router-dom";
import "./usersList.css";

/*TODO:
* добавить редактирование и просмотр профилей юзеров в зависимости от прав авторизованного юзера
* */

export default class UsersList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*
        //Redux
        this.props.actions.fetchUsers();
        */
        this.props.fetchUsers();
    }

    render() {console.log(this.props);
        return (
            <div>
                <h1>Список пользователей</h1>
                <div className="users-info">
                    {
                        this.props.users.map((user, i) => {
                            return (
                                <div key={i} className="user-info">
                                    <h3>{user.name}</h3>
                                    <div>
                                        <Link to={'/users/' + user.userId}>Подробнее</Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
