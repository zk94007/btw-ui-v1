import React from 'react';
import cn from 'classnames';

import BaseComponent from '../../shared/BaseComponent';
import SvgIcon from '../../shared/SvgIcon';

export default class InputBase extends BaseComponent {
    baseState = {
        isValid: true,
        error: ''
    };

    onChange = (e) => {
        let { value } = e.target;
        const { onInputChange = () => { }, removeSpaces = false } = this.props;
        value = removeSpaces ? value.replace(/\s/g, "") : value;
        onInputChange(e);

        this.setState(({ value }), () => {
            if (!this.state.isValid) {
                this.validate();
                return;
            }
            this.onParentChange();
        });
    };

    onFocusOut = (e) => {
        const { onBlur = () => { } } = this.props;
        onBlur(e);
        this.validate();
    };

    onParentChange = () => {
        const { onChange, name, defaultValue = '' } = this.props;
        const { value = defaultValue, isValid } = this.state;
        onChange(value, isValid, name);
    };

    validate = (props = this.props) => {
        let error = '';
        const {
            label,
            validator,
            customError,
            validatorError,
            required,
            defaultValue = ''
        } = props;
        const { value = defaultValue } = this.state;

        if (required && !value) {
            error = `${label} is required`;
        }
        if (validator && value && !validator(value)) {
            error = validatorError || `${label} is incorrect`;
        }
        if (customError) {
            error = customError;
        }
        this.setState(() => ({ error, isValid: !error }), this.onParentChange);
    };

    checkForValidation = (props) => {
        const { customError, startValidation } = props;

        if (this.props.customError === customError && this.props.startValidation === startValidation) {
            return;
        }
        if (customError !== this.props.customError || startValidation) {
            this.validate(props);
        }
    };

    onMount = () => {
        if (this.props.startValidation) {
            this.validate();
        }
    };

    resolveLabel = () => {
        const { label } = this.props;
        return `${label}`;
    };

    renderRightIcon = () => {
        const { isValid, value } = this.state;
        const { rightIcon = null, useGreenMark = true, validator } = this.props;
        if (rightIcon) {
            return rightIcon
        }

        return value && isValid && useGreenMark && (validator ? validator(value) : true)
            ? <SvgIcon width={14} height={10.5} name='green-mark' />
            : null;

    };
}


export class TextInput extends InputBase {
    state = this.baseState;

    componentWillReceiveProps(props) {
        this.checkForValidation(props);
        if (props.defaultValue !== this.props.defaultValue) {
            this.setState({ value: props.defaultValue || '' })
        }
    }

    componentWillMount() {
        this.onMount();
    }

    render = () => {
        const {
            defaultValue,
            type,
            maxLength = 50,
            label,
            id,
            style,
            className,
            inputClassName,
            disabled,
            placeholder,
            hideLabel = false,
            leftIcon,
            autocomplete
        } = this.props;

        const {
            value = defaultValue || '',
            isValid,
            error
        } = this.state;

        return (
            <div className={cn('btw-input', { disabled, error: !isValid }, className)}>
                {!hideLabel && <label htmlFor={id}>{label}</label>}
                <div className={cn('text-box')}>
                    <span className='left-icon'>
                        {leftIcon}
                    </span>
                    <input value={value}
                        id={id}
                        className={cn('btw-input', inputClassName)}
                        style={style}
                        type={type}
                        onBlur={this.onFocusOut}
                        onChange={e => {
                            const { value } = e.target;
                            if (value.length <= maxLength) {
                                this.onChange(e);
                            }
                        }}
                        placeholder={placeholder}
                        autocomplete={autocomplete}
                        disabled={disabled} />
                    <span className='right-icon'>
                        {this.renderRightIcon()}
                    </span>
                </div>
                <div className='error-msg'>
                    {error}
                </div>
            </div>
        );
    };
}

export class TextArea extends InputBase {
    state = this.baseState;

    componentWillReceiveProps(props) {
        if (props.required) {
            this.checkForValidation(props);
        }
        if (props.defaultValue !== this.props.defaultValue) {
            this.setState({ value: props.defaultValue || '' })
        }
    }

    componentWillMount() {
        this.onMount();
    }

    render = () => {
        const {
            defaultValue,
            type,
            maxLength = 50,
            label,
            id,
            style,
            className,
            inputClassName,
            disabled,
            placeholder,
            row = 5,
            helperText,
        } = this.props;

        const {
            value = defaultValue || '',
            isValid,
            error,
        } = this.state;

        return (
            <div className={cn('btw-input', { disabled, error: !isValid }, className)}>
                {label && <label htmlFor={id}>{label}</label>}
                <div className={cn('text-box')}>
                    <textarea
                        id={id}
                        className={cn('btw-input', inputClassName)}
                        style={style}
                        type={type}
                        onBlur={this.onFocusOut}
                        onChange={e => {
                            const { value } = e.target;
                            if (value.length <= maxLength) {
                                this.onChange(e);
                            }
                        }}
                        rows={row}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled} />
                    <span className='right-icon'>
                        {this.renderRightIcon()}
                    </span>
                </div>
                <span>{helperText}</span>
                <div className='error-msg'>
                    {error}
                </div>
            </div>
        );
    };
}