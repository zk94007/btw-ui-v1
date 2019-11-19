import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';

import { Links } from '../../constants/VoterFilters';

const VoterStatusDropdown = ({ className, status, onSelect, options, ...restProps }) => {

    const handleChange = (option) => {
        onSelect(option.value)
    };

    return (
        <Select className={classNames('btw-voter-status-select', className)}
            options={options}
            value={status}
            onChange={handleChange}
            {...restProps}
        />
    )
};

VoterStatusDropdown.propTypes = {
    status: PropTypes.string,
    options: PropTypes.array,
    onSelect: PropTypes.func
};

VoterStatusDropdown.defaultProps = {
    options: Links
};

export default VoterStatusDropdown;
