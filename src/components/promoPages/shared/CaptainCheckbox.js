import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, Checkbox } from '../../shared';

class CaptainCheckbox extends BaseComponent {

    checkHandler = (value) => {
        const { name, onChange, required } = this.props;
        onChange(value, name, required ? value : true);
    };

    render() {
        const { value, label, required } = this.props;

        return (
            <div className='btw-captain-checkbox'>
                <Checkbox
                    checked={value}
                    onChange={this.checkHandler} />
                <Typography className='checkbox-label'>
                    {label } { required && <span className='error-text'>*</span>}
                </Typography>
            </div>
        );
    }
}

CaptainCheckbox.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
};

CaptainCheckbox.defaultProps = {
    name: '',
    value: false,
    label: '',
    onChange: () => { }
}

export default CaptainCheckbox;