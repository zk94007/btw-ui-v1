import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography } from '../../shared';

class CaptainInput extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }

    resolveError = value => {
        let { required, name, label, validate } = this.props;
        label = label || name;

        if (required && !value) {
            return `${label} is required`;
        }

        const isValid = !validate || validate(value);
        return isValid ? '' : `${label} is invalid`;
    };


    onChange = e => {
        const { onChange, name } = this.props;
        const { value } = e.target;
        const error = this.resolveError(value);
        this.setState({ error });

        onChange(value, name, !error);
    };

    render() {
        const {
            name,
            value,
            label,
            subLabel,
            required = false,
            placeholder
        } = this.props;
        const { error } = this.state;

        return (
            <div className='btw-captain-input'>
                <span className='input-div'>
                    <Typography className='input-label'>
                        {label} {' '}
                        <span>{subLabel}</span>
                        <span className='error-text'>{ required && label && ' *'}</span>
                    </Typography>
                    <input
                        onBlur={this.onBlur}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={this.onChange}/>
                </span>
                { error && <span className='error-text'>{ error }</span>}
            </div>
        );
    }
}

CaptainInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    onChange: PropTypes.func
};

CaptainInput.defaultProps = {
    name: '',
    value: '',
    label: '',
    subLabel: '',
    onChange: () => { }
};

export default CaptainInput;