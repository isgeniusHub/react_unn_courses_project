import React from 'react';
import axios from 'axios';
import './articlesList.css';
import Popup from '../Popup';
import { Link } from "react-router-dom"
import Comment from "../Comment";
import Preloader from "../Preloader";
import edit from "../../img/edit.png";
import trash from "../../img/trash.png";

/*TODO:
* доработать редактирование, добавление, удаление постов, лайки
*/

export default class ArticlesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="articles">
                <h1>Статьи</h1>
                {
                    this.props.isLoggedIn &&
                    <div className="article-add">
                        <button
                            onClick={ e => this.props.renderPopup(e) }
                            data-action ="add"
                        >Добавить статью</button>
                    </div>
                }
                {this.props.isLoading && <Preloader />}
                <div className="articles-list">
                    {
                        this.props.articles.map((article, i,arr) => {
                            return (
                                <div key={article.articleId} className="article-item">
                                    {
                                        (
                                            this.props.isLoggedIn &&
                                            (
                                                this.props.user.isAdmin ||
                                                article.userId === this.props.user.userId
                                            )
                                        )
                                        &&
                                        <div className="article-actions">
                                            <span className="article-change">
                                                <img
                                                    src={ edit }
                                                    onClick={ e => this.props.renderPopup(e) }
                                                    data-article-id = { article.articleId }
                                                    data-action ="change"
                                                />
                                            </span>
                                            <span className="article-delete">
                                                <img
                                                    src={ trash }
                                                    onClick={ e => this.props.renderPopup(e) }
                                                    data-article-id = { article.articleId }
                                                    data-action = "delete"
                                                />
                                            </span>
                                        </div>
                                    }
                                    <div  className="article-header">
                                        <div className="article-user">
                                            <Link to={ "/users/" + article.userId }>
                                                { article.userName }
                                            </Link>
                                        </div>
                                        <Link to={'/articles/' + article.articleId}
                                              className = "article-title"
                                        >{ article.title }</Link>
                                    </div>
                                    <div  className="article-text">
                                        <div className="article-likes">
                                            <span
                                                onClick={ this.props.likeSubmit }
                                                data-article-id={ article.articleId }
                                            >&#9825;</span>{article.userLikes.length}
                                        </div>
                                        <div className="article-body">
                                            <div>{ article.text }</div>
                                            <Comment
                                                articleId = { article.articleId }
                                                user = { this.props.user }
                                                isLoggedIn = { this.props.isLoggedIn }
                                                comment = { this.props.comment }
                                                inputChange = { this.props.inputChange }
                                                error = { this.props.error }
                                                renderError = { this.props.renderError }
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    this.props.showPopup &&
                    <Popup
                        actionForms = { this.props.actionForms }
                        closePopup = { this.props.closePopup }
                        action = { this.props.action }
                        articleId = { this.props.articleId }
                        article = { this.props.article }
                        inputChange = { this.props.inputChange }
                        renderError = { this.props.renderError }
                        fetchArticle = { this.props.fetchArticle }
                        addArticle = { this.props.addArticle }
                        changeArticle = { this.props.changeArticle }
                        deleteArticle = { this.props.deleteArticle }
                    />
                }
            </div>
        );
    }
}
