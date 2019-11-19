import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';
import { checkForUniqueEmail } from "../../../actions/ErrorActions";
import errorTypes from '../../../constants/ErrorTypesConstants';

class EmailInput extends InputBase {

    checkForUniqueEmail = (e) => {
        clearTimeout(this.timeoutId);
        const { value } = e.target;
        this.timeoutId = setTimeout(() => {
            this.handleUnique(value);
        }, 3000);
    };

    handleUnique = (value) => {
        const { isVoter = true, disabled, uniqueValidationEnabled = true } = this.props,
            role = isVoter ? 'voter' : 'user';
        if (!disabled && value && uniqueValidationEnabled) {
            this.props.actions.checkForUniqueEmail(value, role);
        }
    };

    render () {
        const { error, placeholder = 'Your email address' } = this.props;
        return <TextInput label='Email'
                          type='email'
                          id='email'
                          placeholder={placeholder}
                          customError={error}
                          onInputChange={this.checkForUniqueEmail}
                          onBlur={e => this.handleUnique(e.target.value)}
                          validator={value => validate(validationTypes.email, value)}
                          name={fields.email}
                          {...this.props } />
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.error[errorTypes.emailExists]
    }
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ checkForUniqueEmail }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailInput);