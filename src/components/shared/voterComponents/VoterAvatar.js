/**
 * usage: <VoterAvatar size={100} initials='SG' src='https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png' color='error' />
 * created at: 2019/06/14
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash'

import { getColorByStatus } from '../../../constants/Colors';

const VoterAvatar = (props) => {
    const { src, size, status, firstname, lastname, noBorder, className } = props;
    const avatarName = _.toUpper(`${firstname.charAt(0)}${lastname.charAt(0)}`);

    return (
        <div className={classNames('btw-voter-avatar', { 'btw-voter-avatar-no-border': noBorder }, className)}
            style={{ width: size, height: size, borderColor: getColorByStatus(status) }}>
            {
                src ? <img className='btw-voter-img' src={src} alt="" />
                    : <span className='btw-voter-avatar-initials'>{avatarName}</span>
            }
        </div>
    )
}

VoterAvatar.defaultProps = {
    src: '',
    size: 40,
    status: 'INACTIVE',
    firstname: 'f',
    lastname: 'l',
    noBorder: false
};

VoterAvatar.propTypes = {
    /* user's avatar url */
    src: PropTypes.string,
    /* avatar width and height pixel */
    size: PropTypes.number,
    /* avatar color : error, alert, success */
    status: PropTypes.string,
    /* user's first name */
    firstname: PropTypes.string.isRequired,
    /* user's last name */
    lastname: PropTypes.string.isRequired,
    /* avatar without border */
    noBorder: PropTypes.bool
};

export default VoterAvatar;