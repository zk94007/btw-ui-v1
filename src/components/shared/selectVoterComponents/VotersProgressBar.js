import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

import { BaseComponent, Button, Typography } from '..';

class VotersProgressBar extends BaseComponent {

    constructor() {
        super();
        this.state = {
            zoom: false
        }
    }

    isSelect = () => {
        return this.props.type === 'select';
    }

    isFinish = () => {
        const { selectedVoters, maxVoters, minVoters } = this.props;

        if (this.isSelect()) {
            return selectedVoters.length <= maxVoters && selectedVoters.length >= minVoters;
        } else {
            return selectedVoters.length >= 1;
        }
    }

    clickHandler = () => {
        const { onNext } = this.props;

        if (this.isFinish()) {
            onNext();
        }
    }

    clearItemHandler = (id) => {
        this.props.onClear(id);
    }

    clearAllHandler = () => {
        const { selectedVoters, onClear } = this.props;

        if (selectedVoters.length !== 0) {
            onClear('all');
        }
    }

    zoomHandler = () => {
        const { zoom } = this.state;
        this.setState({ zoom: !zoom });
    }

    renderVotersList = () => {
        const { selectedVoters } = this.props;
        const { zoom } = this.state;

        return (
            <Row className={classNames('voters-list-container', { 'open': zoom })}>
                {
                    selectedVoters.map((voter, i) => {
                        return (
                            <Col key={i} xs={12} sm={4} md={4} lg={12}>
                                <div className='item'>
                                    <Typography variant='body'>
                                        {voter.firstname} {voter.lastname}
                                    </Typography>
                                    <span className='fa fa-close' onClick={() => this.clearItemHandler(voter.id)} />
                                </div>
                            </Col>
                        );
                    })
                }
            </Row >
        );
    }

    renderProgressBar = () => {
        const { selectedVoters, maxVoters } = this.props;

        if (this.isSelect()) {
            return (
                <div className='progress-container'>
                    {[...Array(maxVoters)].map((e, i) => {
                        return <div key={i} className={classNames('item', { 'active': selectedVoters.length > i })} />
                    })}
                </div>
            );
        }
    }

    render() {
        const { selectedVoters, maxVoters, className } = this.props;
        const { zoom } = this.state;

        return (
            <div className={classNames('btw-voters-progress-bar btw-paper', { 'vpb-full-height': zoom }, className)}>
                <div>
                    <div className='zoom-container'>
                        <div className='zoom' onClick={this.zoomHandler} />
                    </div>
                    <div className='status-container'>
                        <div className='status'>
                            Added {selectedVoters.length}
                            {this.isSelect() && `/${maxVoters}`}:</div>
                        <span
                            className={classNames('clear', { 'active': selectedVoters.length !== 0 })}
                            onClick={this.clearAllHandler}>
                            Clear All
                    </span>
                    </div>
                    {this.renderProgressBar()}
                    {this.renderVotersList()}
                </div>
                <div className='button-container'>
                    <Button
                        onClick={this.clickHandler}
                        disabled={!this.isFinish()} >
                        Finish
                    </Button>
                </div>
            </div>
        );
    }
}

VotersProgressBar.propTypes = {
    type: PropTypes.oneOf(['select', 'add']),
    selectedVoters: PropTypes.array,
    maxVoters: PropTypes.number,
    onClear: PropTypes.func,
    onNext: PropTypes.func,
};

VotersProgressBar.defaultProps = {
    maxVoters: 20,
    minVoters: 10,
    type: 'select'
}

export default VotersProgressBar;
