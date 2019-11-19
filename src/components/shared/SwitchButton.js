import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SwitchButton = ({ className, onSwitch, checked, ...restProps }) => {

    const handleChange = (event) => {
        onSwitch(event.target.checked, event)
    }

    return (
        <label className={classNames('btw-switch', className)} {...restProps}>
            <input
                type='checkbox'
                onChange={handleChange}
                checked={checked} />
            <span className='slider round'></span>
        </label>
    )
};

SwitchButton.propTypes = {
    checked: PropTypes.bool,
    onSwitch: PropTypes.func
};

SwitchButton.defaultProps = {
    checked: true,
    onSwitch: () => { }
};

export default SwitchButton;