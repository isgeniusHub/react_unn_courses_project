import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/*TODO:
*сделать редактирование юзера для админа
* */

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
        this.getUserArticles = this.getUserArticles.bind(this);
    }

    async getUserArticles(){
        try {
            const url = 'http://localhost:7000/articles/user/' + this.props.userId;
            const response = await axios.get(url);
            this.setState({
                articles: response.data,
            });
        } catch (e) {
            this.catchError(e);
        }
    }

    componentDidMount() {
        this.getUserArticles();
    }

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <p>Почта: {this.props.email}</p>
                <p>Город: {this.props.city}</p>
                <p>О себе: {this.props.email}</p>
                {
                    (this.state.articles.length)
                    ?
                    <div>
                        <h3>Статьи пользователя:</h3>
                        {
                                this.state.articles.map((article,i) => {
                                    return (
                                        <div className="article" key={i}>
                                            <div className="article-header">
                                                <div className="article-title">
                                                    <Link to={"/articles" + "/" +  article.articleId }>
                                                        { article.title }
                                                    </Link>
                                                </div>
                                                <div className="article-likes">
                                                    <span
                                                        onClick={ this.props.likeSubmit }
                                                        data-article-id={ article.articleId }
                                                    >&#9825;</span>
                                                    {article.userLikes.length}
                                                </div>
                                            </div>
                                            <div className="article-text">{article.text}</div>
                                        </div>
                                    );
                                })
                        }
                    </div>
                    :
                    <div></div>
                }
            </div>
        );
    }
}
