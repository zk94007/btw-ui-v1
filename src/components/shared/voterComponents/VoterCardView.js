import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';

import { VoterAvatar, VoterInfo } from './index'
import { SocialList, StatusIcon } from '../index'

const VoterItem = (props) => {
    const { data, keyword, onSelectItem, active } = props;

    return (
        <div onClick={onSelectItem}
            className={classNames({ 'active-item': active }, 'btw-voter-item btw-paper')}>
            <VoterAvatar
                src={data.src}
                firstname={data.firstname}
                lastname={data.lastname}
                status={data.voterStatus || 'INACTIVE'} />
            <div className='voter-info'>
                <VoterInfo
                    firstname={data.firstname}
                    lastname={data.lastname}
                    gender={data.gender || 'Male'}
                    keyword={keyword}
                    street={data.address} />
                <div className='voter-status'>
                    <SocialList social={data.socialNetwork} showVoterFile />
                    <StatusIcon type={data.voterStatus} />
                </div>
            </div>
        </div>
    )
}

VoterItem.propTypes = {
    /* keyword searched */
    keyword: PropTypes.string,
    /* active whether selected or not by clicking */
    active: PropTypes.bool,
    /* voter data */
    data: PropTypes.object.isRequired,
    /* action click handler with this component */
    onSelectItem: PropTypes.func.isRequired
}

VoterItem.defaultProps = {
    keyword: '',
    active: false,
    data: {}
}

export default VoterItem