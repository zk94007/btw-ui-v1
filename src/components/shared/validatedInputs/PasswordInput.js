import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import validationTypes from '../../../constants/ValidationTypes';
import { validate } from '../../../utility/InputValidator';

export default class PasswordInput extends InputBase {
    render() {
        const { label, id, name } = this.props

        return <TextInput label={label || 'Password'}
            type='password'
            id={id || 'password'}
            validator={value => validate(validationTypes.password, value)}
            validatorError={
                <div className='btw-password-error'>
                    <div id='requirements'>
                        Your password must be at least 7 characters with
                        <br />
                        One special character,
                        <br />
                        One upper case letter and one numeric.
                    </div>
                </div>
            }
            name={name || fields.password}
            {...this.props} />
    }
}