import React from 'react';
import { Link } from "react-router-dom";
import Contact from "../Contact";
import { connect } from 'react-redux';
import './footer.css';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="container">
                    <ul className="footer-column">
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
                    <div className="footer-column contacts">
                        <div style={{marginBottom: 20 + "px"}}>
                            {
                                this.props.contacts.map( (contact, i) => {
                                    return (
                                        <Contact
                                            key = {i}
                                            href = { contact.href }
                                            title = { contact.title }
                                            src = { contact.src }
                                            contact = { contact.contact }
                                        />
                                    );
                                })
                            }
                        </div>
                        <div>
                            © Copyright by <a href={"https://github.com/isgeniusHub"} target="_blank" className="logo">IsGenius</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = state => {
    return {
        pages: state.main.pages,
        contacts: state.main.contacts
    };
};

export default connect(mapStateToProps, null)(Footer);

