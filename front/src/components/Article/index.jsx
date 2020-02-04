import React from 'react';
import './article.css';
import { Link } from "react-router-dom";
import Comment from "../Comment";
import Textarea from "../Textarea";

/*TODO
 * добавить комменты, добавление комментов,
 * добавить удаление статей админом
*/

export default class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <h1>{ this.props.title }</h1>
            <p>{ this.props.text }</p>
            <Comment
                articleId = { this.props.articleId }
                user = { this.props.user }
                comment = { this.props.comment }
                isLoggedIn = { this.props.isLoggedIn }
                inputChange = { this.props.inputChange }
                error = { this.props.error }
                renderError = { this.props.renderError }
            />
        </div>
    }
}
