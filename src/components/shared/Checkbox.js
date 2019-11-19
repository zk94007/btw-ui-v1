import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Checkbox = ({ className, label, onChange, checked, ...restProps }) => {

    const handleChange = (event) => {
        onChange(event.target.checked, event)
    }

    return (
        <label className={classNames('btw-checkbox', className)} {...restProps}>
            {label}
            <input
                type='checkbox'
                onChange={handleChange}
                checked={checked} />
            <span className='checkmark' />
        </label>
    )
};

Checkbox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default Checkbox;