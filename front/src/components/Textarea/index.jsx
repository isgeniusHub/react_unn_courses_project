import React from 'react';

export default class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.getDefaultValue = this.getDefaultValue.bind(this);
    }

    getDefaultValue(){
        if("defaultValue" in this.props && this.props.defaultValue){
            return this.props.defaultValue;
        }
        if(this.props.stateKey && this.props[this.props.stateKey]){
            return this.props[this.props.stateKey][this.props.name];
        }

        return this.props[this.props.name] || "";
    }


    render() {
        return (
            <label>
                { this.props.label }
                <textarea
                    type = { this.props.type }
                    name = { this.props.name }
                    placeholder = { this.props.placeholder }
                    data-state-key = { this.props.stateKey }
                    defaultValue = { this.getDefaultValue() || ""}
                    required = { this.props.required ? this.props.required : false }
                    disabled = { (this.props.isEdited === false ) ? true : false }
                    onChange = { this.props.inputChange }
                    ref = { this.props.referer }
                />
                { this.props.error && this.props.renderError(this.props.name) }
            </label>
        );
    }
}
