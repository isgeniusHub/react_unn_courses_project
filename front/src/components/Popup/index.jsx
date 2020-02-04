import React from 'react';
import "./popup.css";
import InputField from "../InputField";
import TextareaField from "../Textarea";

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const form = this.props.actionForms.find( form => form.action === this.props.action );

        return (
            <div className="popup-window">
                <div className="popup-overlay" onClick={ this.props.closePopup }></div>
                <div className="popup-container">
                    <div className="popup-close" onClick={ this.props.closePopup }>&#10006;</div>
                    <h1>{ form.title }</h1>
                    <div className="popup-form">
                        { form.bodyText ? <div>{ form.bodyText }</div> : null }
                        <div>
                            {
                                form.fields &&
                                form.fields.map( (field, i) => {
                                    if(field.tag === "input"){
                                        return <InputField
                                            key = {i}
                                            id = { field.id }
                                            defaultValue = { field.defaultValue }
                                            name = { field.name }
                                            article = { this.props.article }
                                            label = { field.label }
                                            stateKey = { field.stateKey }
                                            inputChange = { this.props.inputChange }
                                            renderError = { this.props.renderError }
                                        />
                                    }else if(field.tag === "textarea"){
                                        return <TextareaField
                                            key = {i}
                                            id = { field.id }
                                            name = { field.name }
                                            label = { field.label }
                                            stateKey = { field.stateKey }
                                            article = { this.props.article }
                                            defaultValue = { field.defaultValue }
                                            inputChange = { this.props.inputChange }
                                            renderError = { this.props.renderError }
                                        />
                                    }
                                })
                            }
                        </div>
                        <div>
                            <button onClick={ this.props[form.buttonAction] }  data-article-id = { this.props.articleId }>
                                { form.buttonText || "Сохранить" }
                            </button>
                            <button onClick={ this.props.closePopup }>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
