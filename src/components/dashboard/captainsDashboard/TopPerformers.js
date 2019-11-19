import React from 'react';
import PropTypes from 'prop-types';

import routes from '../../../constants/Routes';
import colors from '../../../constants/Colors';
import { BaseComponent, Typography, CongratsAlarm, VoterPerformer } from '../../shared';

class TopPerformers extends BaseComponent {

    renderFullLeaderboard = (isfooter = false) => {
        return (
            <span
                className={isfooter ? 'full-leaderboard-footer' : 'full-leaderboard'}
                onClick={() => this.onLink(routes.leaderboard)}>
                Full Leaderboard
            </span>
        )
    }

    render() {
        const { performers } = this.props;

        return (
            <div className='bcd-top-performers'>
                <CongratsAlarm className='congrats'>
                    <Typography variant='body' color={colors['white']}>
                        Your result is better than of <b>75%</b> of Captains this week!
                    </Typography>
                </CongratsAlarm>
                <div className='content'>
                    <div className='content-header'>
                        <Typography className='content-title'>This week Top Performers</Typography>
                        {this.renderFullLeaderboard()}
                    </div>
                    {
                        performers.map((performer, index) => (
                            <VoterPerformer
                                key={index}
                                performer={performer}
                                rank={index + 1} />
                        ))
                    }
                    {this.renderFullLeaderboard(true)}
                </div>
            </div>
        );
    }
}

TopPerformers.propTypes = {
    performers: PropTypes.array
};

export default TopPerformers;