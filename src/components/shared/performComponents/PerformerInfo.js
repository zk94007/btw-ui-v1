
import React from 'react'
import PropTypes from 'prop-types';
import { Typography } from '../index';

const PerformerInfo = (props) => {
    const { name, level } = props

    return (
        <div className='btw-performer-info'>
            <Typography variant='body' fontWeight='600'>
                {name}
            </Typography>
            <Typography variant='functional' lightColor>
                Level: {level}
            </Typography>
        </div>
    )
}

PerformerInfo.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
}
PerformerInfo.defaultProps = {
    name: '',
    level: ''
}

export default PerformerInfo;