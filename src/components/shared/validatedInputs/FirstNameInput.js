import React from 'react';
import InputBase, { TextInput } from './InputBase';
import fields from '../../../constants/FieldConstants';
import { validate } from '../../../utility/InputValidator';

export default class FirstNameInput extends InputBase {
    render() {
        const { placeholder = 'Your first name' } = this.props;
        return <TextInput label='First Name'
            type='text'
            id='firstname'
            removeSpaces={true}
            placeholder={placeholder}
            validator={value => validate('name', value)}
            validatorError='Name must be at least 2 characters without number and special character'
            name={fields.firstName}
            {...this.props} />
    }
}