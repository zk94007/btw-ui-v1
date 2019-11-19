/**
 * usage: <VoterInfo name='First Last' gender='Male' street='address street' keyword='' />
 */
import React from 'react'
import PropTypes from 'prop-types';

import { Typography } from '../index'
/**
 * Show voters info like first name, last name, gender, address
 * @param  {String} firstname : first name
 * @param  {String} lastname : last name
 * @param  {String} gender : user's gender
 * @param  {String} street : user's address
 * @return {Component} 
 */
const VoterInfo = (props) => {
    const { firstname, lastname, gender, street } = props;

    return (
        <div>
            <Typography variant='body' fontWeight='600'>
                {firstname} {lastname}
            </Typography>
            <Typography variant='body' lightColor>
                {`${gender} | ${street}`}
            </Typography>
        </div>
    )
}

VoterInfo.propTypes = {
    /* voter's name */
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    /* voter's address */
    street: PropTypes.string.isRequired,
    /* voter's gender */
    gender: PropTypes.string.isRequired,
}

VoterInfo.defaultProps = {
    firstname: '',
    lastname: '',
    gender: 'Male',
    street: '',
}

export default VoterInfo;