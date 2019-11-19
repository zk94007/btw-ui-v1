import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, VoterAvatar } from '../index';

class PerformerRank extends BaseComponent {

    renderRankContent = () => {
        const { rank, topNumber } = this.props;

        return rank <= topNumber ?
            <SvgIcon name={`place-${rank}`} className='place' /> :
            <Typography variant='body' className='place'>
                {`${rank}.`}
            </Typography>
    }

    render() {
        const { performer } = this.props;

        return (
            <div className='btw-performer-rank'>
                {this.renderRankContent()}
                <VoterAvatar
                    firstname={performer.firstName}
                    lastname={performer.lastName}
                    src={performer.src}
                    status={performer.voterStatus} />
            </div>
        )
    }
}

PerformerRank.propTypes = {
    performer: PropTypes.object,
    rank: PropTypes.number
};

PerformerRank.defaultProps = {
    topNumber: 3
}

export default PerformerRank;