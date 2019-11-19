import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography } from '../index';
import { PerformerInfo, PerformerRank, PerformerStatusItem } from './index';

class VoterPerformer extends BaseComponent {

    renderItem = (label, value, type = 'point') => {
        return (
            <div className='status-item'>
                <Typography variant='body' fontWeight='600' className='status-label'>{label}:</Typography>
                <PerformerStatusItem type={type} value={value} />
            </div >
        );
    }

    renderStatus = () => {
        const { performer: { points, activeTasks } } = this.props;

        return (
            <div className='performer-status'>
                {this.renderItem('Tasks done', activeTasks, 'task')}
                {this.renderItem('Points earned', points)}
            </div>
        );
    }

    renderPerformer = () => {
        const { rank, performer } = this.props;

        return (
            <div className='performer-info'>
                <PerformerRank performer={performer} rank={rank} />
                <PerformerInfo
                    name={`${performer.firstName} ${performer.lastName}`}
                    level={performer.level} />
            </div>
        )
    }

    render() {
        return (
            <div className='btw-voter-performer-item btw-paper'>
                {this.renderPerformer()}
                {this.renderStatus()}
            </div >
        )
    }
}


VoterPerformer.propTypes = {
    performer: PropTypes.object,
    rank: PropTypes.number
};

export default VoterPerformer;