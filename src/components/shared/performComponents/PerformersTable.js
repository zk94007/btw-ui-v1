import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import classNames from 'classnames';

import { BaseComponent, SvgIcon, Typography } from '../index';
import { PerformerInfo, PerformerRank, PerformerStatusItem } from './index';

class PerformersTable extends BaseComponent {

    selectRowHandler = (item) => () => {
        this.props.onSelect(item);
    }

    renderStatusItem = (value, isPoint = true) => {
        return (
            <Typography variant='body' fontWeight='600'>
                <SvgIcon name={isPoint ? 'medal' : 'action-status-completed'} className='status-icon' />
                {value}
            </Typography>
        );
    }

    renderDesktopHeader = () => {
        return (
            <tr>
                <th className='rank-content'>Rank</th>
                <th>Captain</th>
                <th className='score-content'>Tasks done</th>
                <th className='score-content'>Points earned</th>
            </tr>
        );
    }

    renderDesktopBody = () => {
        const { data, selectedItem } = this.props;

        return data.map((item, i) => {
            return (
                <tr
                    key={i}
                    className={classNames('desktop-body', { 'selected-row': item.id === selectedItem.id })}
                    onClick={this.selectRowHandler(item)}>
                    <td>
                        <PerformerRank performer={item} rank={i + 1} />
                    </td>
                    <td>
                        <PerformerInfo
                            name={`${item.firstName} ${item.lastName}`}
                            level={item.level} />
                    </td>
                    <td>
                        <PerformerStatusItem value={item.activeTasks} type='task' />
                    </td>
                    <td>
                        <PerformerStatusItem value={item.points} />
                    </td>
                </tr>
            );
        })
    }

    renderMobileBody = () => {
        const { data, selectedItem } = this.props;

        return data.map((item, i) => {
            return (
                <tr
                    key={i}
                    className={classNames('mobile-body', { 'selected-row': item.id === selectedItem.id })}
                    onClick={this.selectRowHandler(item)}>
                    <td className='rank-content'>
                        <PerformerRank performer={item} rank={i + 1} />
                    </td>
                    <td>
                        <PerformerInfo
                            name={`${item.firstName} ${item.lastName}`}
                            level={item.level} />
                    </td>
                    <td>
                        <div className='status-content'>
                            <PerformerStatusItem value={item.activeTasks} type='task' />
                            <PerformerStatusItem value={item.points} />
                        </div>
                    </td>
                </tr>
            );
        })
    }

    render() {
        const { className } = this.props;

        return (
            <div className={classNames('btw-performers-table', className)}>
                <Table responsive>
                    <thead className='desktop-header'>
                        {this.renderDesktopHeader()}
                    </thead>
                    <tbody>
                        {this.renderDesktopBody()}
                        {this.renderMobileBody()}
                    </tbody>
                </Table >
            </div >
        );
    }
}

PerformersTable.propTypes = {
    data: PropTypes.array,
    selectedItem: PropTypes.object,
    onSelect: PropTypes.func
};

PerformersTable.defaultProps = {
    data: [],
    selectedItem: {},
    onSelect: () => { }
}

export default PerformersTable;
