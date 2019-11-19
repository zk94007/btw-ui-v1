import React from 'react';

import { SvgIcon } from '../../../shared';

import './styles.scss';

const LeftIcon = ({ name }) => {
    return (
        <div className='btw-left-icon'>
            <SvgIcon name={name} />
        </div>
    )
};

export default LeftIcon;