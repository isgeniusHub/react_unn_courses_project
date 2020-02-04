import React from 'react';
import axios from 'axios';
import './comment.css';
import { Link } from "react-router-dom"
import Textarea from "../Textarea";
import trash from "../../img/trash.png";
import Popup from "../Popup";

/*TODO:
* доработать добавление комментов, удаление комментов
* */

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            comments: [],
            showCommentAddForm: false,
            commentText: null
        };
        this.addComment = this.addComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.renderCommentForm = this.renderCommentForm.bind(this);
        this.onAddCommentText = this.onAddCommentText.bind(this);
        this.fetchArticleComments = this.fetchArticleComments.bind(this);
    }

    renderCommentForm(){
        this.setState({
            showCommentAddForm: !this.state.showCommentAddForm,
            commentText: "",
        })
    }

    onAddCommentText(e){
        this.setState({
            commentText: e.target.value,
        })
    }

    async addComment(e){
        try {
            const response = await axios.post(
                'http://localhost:7000/comment/add',
                {
                    articleId: this.props.articleId,
                    text: this.props.comment.text,
                },
                {
                    headers: {'Authorization': 'Bearer ' + this.props.user.token},
                }
            );
            this.setState({
                showCommentAddForm: !this.state.showCommentAddForm,
                commentText: "",
            })

            this.fetchArticleComments(this.props.articleId);
        } catch (e) {
            this.props.catchError(e);
        }
    }

    async deleteComment(e){
        try {
            const response = await axios.delete(
                'http://localhost:7000/comment/delete/' + e.target.dataset.commentId,
                {
                    headers: {'Authorization': 'Bearer ' + this.props.user.token},
                }
            );

            this.fetchArticleComments(this.props.articleId);
        } catch (e) {
            this.props.catchError(e);
        }
    }

    async fetchArticleComments(id) {
        this.setState({
            isLoading: true,
        });

        try {
            const response = await axios.get('http://localhost:7000/comments/' + id);
            this.setState({
                comments: response.data,
            });
        } catch (e) {
            this.props.catchError(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }

    componentDidMount() {
        this.fetchArticleComments(this.props.articleId);
    }

    render() {console.log(this.props,this.state);
        return (
            <div>
                { (this.state.comments.length) ? <div className="comments">Комментарии:</div> : null }
                {
                    this.state.comments.map(comment => {
                        return (
                            <div className="comment-item" key={ comment.commentId }>
                                <div className="comment-author">
                                    <Link to={ "/users/" + comment.userId }>{ comment.userName }:</Link>
                                </div>
                                <div className="comment-text">
                                    <div>{ comment.text }</div>
                                    {
                                        (
                                            this.props.isLoggedIn &&
                                            (
                                                this.props.user.isAdmin ||
                                                comment.userId === this.props.user.userId
                                            )
                                        )
                                        &&
                                        <span className="comment-delete">
                                            <img
                                                src={ trash }
                                                onClick={ e => this.deleteComment(e) }
                                                data-comment-id = { comment.commentId }
                                                data-action = "delete"
                                            />
                                        </span>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
                {
                    this.props.isLoggedIn &&
                    <div className="comment-add">
                        <button onClick={ this.renderCommentForm }>Добавить комментарий</button>
                    </div>
                }
                {
                    this.state.showCommentAddForm &&
                    <div>
                        <div className="comment-add-form">
                            <Textarea
                                label = "Ваш комментарий"
                                type = "text"
                                name = "text"
                                stateKey = "comment"
                                user = { this.props.user }
                                inputChange = { this.props.inputChange }
                                error = { this.props.error }
                                renderError = { this.props.renderError }
                            />
                            <div>
                                <button onClick={this.addComment}>Добавить</button>
                                <button onClick={this.renderCommentForm}>Отмена</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
