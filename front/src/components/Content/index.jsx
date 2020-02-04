import React from 'react';
import axios from "axios";
import ContentBlock from "../ContentBlock";
import "./content.css";
import mainActions from '../../actions/main';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchContent();
    }

    render() {
        let users=this.props.contentBlocks.filter( (content) =>
            content.stateKey === "user"
        );
        let articles=this.props.contentBlocks.filter( (content) =>
            content.stateKey === "article"
        );

        return (
            <main>
                <h1>
                    {
                        "Здравствуйте" +
                        ( ("name" in this.props.user) ? ", " + this.props.user.name : "" ) +
                        "!"
                    }
                </h1>
                {
                    <div>
                        <div className="article-block">
                            {
                                articles.map((content, i) => {
                                    return (
                                        <div className="article-block-column" key = {i}>
                                            <ContentBlock
                                                title = { content.title }
                                                items = { content.items }
                                                href = { content.href }
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="users-block">
                            {
                                users.map((content, i) => {
                                    return (
                                        <ContentBlock
                                            key = {i}
                                            title = { content.title }
                                            items = { content.items }
                                            href = { content.href }
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.main,
        ...state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(mainActions, dispatch)
    };
};

const Wrapped =
    connect(mapStateToProps, mapDispatchToProps)(Content);

export default Wrapped;

