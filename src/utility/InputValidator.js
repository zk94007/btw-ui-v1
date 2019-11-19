import {
    emailValidation,
    passwordValidation,
    nameValidation,
    textValidation
} from './FormValidation';
import validationTypes from '../constants/ValidationTypes';

export function validate(type, value) {
    switch (type) {
        case validationTypes.email:
            return emailValidation(value);
        case validationTypes.password:
            return passwordValidation(value);
        case validationTypes.name:
            return nameValidation(value);
        default:
            return textValidation(value);
    }
}