import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import mainActions from "../../actions/main";

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.getDefaultValue = this.getDefaultValue.bind(this);
    }

    getDefaultValue(){
        console.log("prop: ",this.props);
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
            (!this.props.onlyInEdit || this.props.isEdited) &&
            <label>
                { this.props.label }
                <input
                    type = { this.props.type }
                    name = { this.props.name }
                    defaultValue = { (this.props.name !== "password") ? this.getDefaultValue() : ""}
                    placeholder = { this.props.placeholder }
                    data-state-key = { this.props.stateKey }
                    required = { this.props.required ? this.props.required : false }
                    disabled = {
                        (this.props.isEdited === false ||
                        ("onlyAdminEdit" in this.props && this.props.onlyAdminEdit && !this.props.isAdmin)) ?
                         true : false
                    }
                    onChange = { this.props.inputChange }
                    ref = { this.props.referer }
                />
                { this.props.error && this.props.renderError(this.props.name) }
            </label>
        );
    }
}
/*
const mapStateToProps = state => {
    return {
        ...state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(mainActions, dispatch)
    };
};

const Wrapped =
    connect(mapStateToProps, mapDispatchToProps)(InputField);

export default Wrapped;*/


