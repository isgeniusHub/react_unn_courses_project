import React from 'react';
import axios from 'axios';
import ArticlesList from "../ArticlesList";
import Article from "../Article";
import PageNotFound from "../PageNotFound";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default class ArticlesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            article: { title: "", text: ""},
            isLoading: false,
            showPopup: false,
            articleId: "",
            action: "",
            actionForms: [
                {
                    action: "change",
                    title: "Редактирование",
                    fields: [
                        { name: "title", tag: "input", label: "Заголовок", stateKey: "article" },
                        { name: "text", tag: "textarea", label: "Текст", stateKey: "article" },
                    ],
                    buttonAction: "changeArticle"
                },
                {
                    action: "add",
                    title: "Добавление",
                    fields: [
                        { name: "title", tag: "input", label: "Заголовок", stateKey: "article" },
                        { name: "text", tag: "textarea", label: "Текст", stateKey: "article" },
                    ],
                    buttonAction: "addArticle"
                },
                {
                    action: "delete",
                    title: "Удаление",
                    bodyText: "Вы уверенны что хотите удалить статью?",
                    buttonAction: "deleteArticle",
                    buttonText: "Удалить",
                },
            ],
        };

        this.fetchArticle = this.fetchArticle.bind(this);
        this.fetchAuthors = this.fetchAuthors.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.likeSubmit = this.likeSubmit.bind(this);
        this.changeArticle = this.changeArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.addArticle = this.addArticle.bind(this);
    }

    async fetchArticle(articleId = 0) {
        this.setState({
            isLoading: true,
        });

        try {
            const url = 'http://localhost:7000/article';
            const response = await axios.get((articleId) ? url + "/" + articleId : url);
            const articles = await this.fetchAuthors(response.data);
            this.setState({
                articles: articles,
            });

        } catch (e) {
            this.props.catchError(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }

    async fetchAuthors(articles) {
        let result = articles;
        try {
            const url = 'http://localhost:7000/user';
            const response = await axios.get(url);
            result.map(article => {
                let user = response.data.find(user => user.userId === article.userId);
                article.userName = user.name;
            })
            return result;
        } catch (e) {
            this.props.catchError(e);
        }
    }


    async changeArticle(e){
        try {
            const response = await axios.put(
                'http://localhost:7000/article/change/' + this.state.articleId,
                {
                    title: this.props.article.title || this.state.article.title,
                    text: this.props.article.text || this.state.article.text,
                    userId: this.props.user.userId
                },
                {
                    headers: {'Authorization': 'Bearer ' + this.props.user.token },
                }
            );

            this.setState({
                showPopup: false,
                articleId: "",
            });
            this.fetchArticle();
        } catch (e) {
            this.props.catchError(e);
        }
    }

    async deleteArticle(){
        try {
            const response = await axios.delete(
                'http://localhost:7000/article/delete/' + this.state.articleId,
                {
                    headers: {'Authorization': 'Bearer ' + this.props.user.token },
                }
            );

            this.setState({
                articleId: "",
                showPopup: false,
            });

            this.fetchArticle();
        } catch (e) {
            this.props.catchError(e);
        }
    }

    async addArticle(){
        try {
            const response = await axios.post(
                'http://localhost:7000/article/add',
                {
                    title: this.props.article.title,
                    text: this.props.article.text,
                    userId: this.props.user.userId
                },
                {
                    headers: {'Authorization': 'Bearer ' + this.props.user.token},
                }
            );
            this.setState({
                showPopup: false,
            });
            this.fetchArticle();
        } catch (e) {
            this.props.catchError(e);
        }
    }

    renderPopup(e){
        const curArticle = this.state.articles.find( article =>
            article.articleId === e.target.dataset.articleId
        );

        this.setState({
            showPopup: true,
            action: e.target.dataset.action,
            articleId: e.target.dataset.articleId,
            article: curArticle ?
                { title: curArticle.title, text: curArticle.text } :
                { title: "", text: "" }
        });
    }

    closePopup(){
        this.setState({
            showPopup: false,
        });
    }

    async likeSubmit(e){
        this.setState({
            isLoading: true,
        });

        try {
            const response = await axios.put(
                "http://localhost:7000/article/like/" + e.target.dataset.articleId,
                {},
                {
                    headers: {'Authorization': 'Bearer ' + this.props.user.token},
                });

            this.fetchArticle();
        } catch (e) {
            this.props.catchError(e);
        } finally {
            this.setState({
                isLoading: false,
            });
        }
    }

    componentDidMount() {
        this.fetchArticle();
    }

    render() {
        return (
            <Switch>
                <Route
                    path={ '/articles' }
                    exact
                    render={(props) => {
                        return (
                            <ArticlesList
                                renderPopup = { this.renderPopup }
                                closePopup = { this.closePopup }
                                likeSubmit = { this.likeSubmit }
                                fetchArticle = { this.fetchArticle }
                                addArticle = { this.addArticle }
                                changeArticle = { this.changeArticle }
                                deleteArticle = { this.deleteArticle }
                                inputChange = { this.props.inputChange }
                                renderError = { this.props.renderError }
                                isLoggedIn = { this.props.isLoggedIn }
                                article = { this.state.article }
                                user = { this.props.user }
                                comment = { this.props.comment }
                                { ...this.state }
                            />
                        );
                    }}
                />
                <Route
                    path={ "/articles/:articleId" }
                    render={(props) => {
                        const articleId = props.match.params.articleId;
                        const selectedArticle = this.state.articles.find( article => article.articleId === articleId);
                        if(selectedArticle) {
                            return (
                                <Article
                                    { ...selectedArticle }
                                    user = { this.props.user }
                                    isLoggedIn={ this.props.isLoggedIn }
                                    inputChange = { this.props.inputChange }
                                    renderError = { this.props.renderError }
                                    likeSubmit = { this.likeSubmit }
                                    fetchArticle = { this.fetchArticle }
                                    addArticle = { this.addArticle }
                                    changeArticle = { this.changeArticle }
                                    deleteArticle = { this.deleteArticle }
                                    comment = { this.props.comment }
                                />
                            );
                        }

                        return <PageNotFound />
                    }}
                />
            </Switch>
        );
    }
}
