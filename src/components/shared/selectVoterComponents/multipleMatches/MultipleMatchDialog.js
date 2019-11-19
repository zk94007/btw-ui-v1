import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { BaseComponent, Button, Dialog } from '../../index';
import { BulletList } from '../index';
import Description from './shared/Description';
import PotentialVoterList from './shared/PotentialVoterList';
import VoterInfo from './shared/VoterInfo';

class MultipleMatchDialog extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedVoter: undefined,
            selectedPotentialVoter: {},
            matchedVoters: [],
            steps: [],
            currentStep: 0
        }
    }

    componentDidMount() {
        const { voters } = this.props;
        let steps = voters.map(() => ({ status: 'default' }));
        this.setState({
            selectedVoter: voters[0],
            matchedVoters: voters.map(voter => ({ ...voter, potentialVoterId: null })),
            steps
        });
    }

    isLast = () => {
        const { voters } = this.props;
        const { currentStep } = this.state;
        return voters.length === currentStep + 1;
    };

    onNextHandler = () => {
        let { steps, currentStep, matchedVoters, selectedPotentialVoter } = this.state;
        const { voters } = this.props;
        steps[currentStep] = { status: 'select' };
        matchedVoters[currentStep] = {
            ...selectedPotentialVoter,
            ...{ potentialVoterId: selectedPotentialVoter.id, potentialVoters: [] }
        };

        currentStep++;

        this.setState({
            steps,
            matchedVoters,
            currentStep,
            selectedVoter: voters[currentStep],
            selectedPotentialVoter: {}
        });
    };

    onSkipHandler = () => {
        let { steps, currentStep } = this.state;
        const { voters } = this.props;
        steps[currentStep] = { status: 'skip' };

        currentStep++;

        this.setState({
            steps,
            currentStep,
            selectedVoter: voters[currentStep],
            selectedPotentialVoter: {}
        });

        if (!voters[currentStep]) {
            this.onCloseHandler();
        }
    };

    onBackHandler = () => {
        let { steps, currentStep } = this.state;
        const { voters } = this.props;
        currentStep--;
        steps[currentStep] = {};

        this.setState({
            steps,
            currentStep,
            selectedVoter: voters[currentStep],
            selectedPotentialVoter: {}
        });
    };

    onCloseHandler = () => {
        const { onClose, onSuccess } = this.props;
        const { matchedVoters } = this.state;

        onSuccess(matchedVoters);
        onClose();
    };

    selectPotentialVoterHandler = selectedPotentialVoter => () => {
        this.setState({ selectedPotentialVoter });
    };

    renderDescription = () => {
        const { selectedVoter: { firstname, lastname } } = this.state;

        return <Description firstname={firstname} lastname={lastname} />;
    };

    renderVoterInfo = () => {
        const { selectedVoter } = this.state;

        return <VoterInfo selectedVoter={selectedVoter} />
    };

    renderPotentialVoterList = () => {
        const { selectedVoter: { potentialVoters = [] }, selectedPotentialVoter } = this.state;

        return <PotentialVoterList potentialVoters={potentialVoters}
                                   selectedVoterId={selectedPotentialVoter.id}
                                   selectPotentialVoterHandler={this.selectPotentialVoterHandler} />;
    };

    renderActionButton = () => {
        const { selectedPotentialVoter } = this.state;

        return (
            <div className='button-list'>
                <div className='button-sub-grouup'>
                    <Button
                        color='white'
                        onClick={this.onBackHandler}
                        className='match-button'>
                        Back
                    </Button>
                    <Button
                        disabled={_.isEmpty(selectedPotentialVoter)}
                        onClick={this.onNextHandler}
                        className='match-button'>
                        {this.isLast() ? 'Finish' : 'Next'}
                    </Button>
                </div>
                <Button
                    color='white'
                    onClick={this.onSkipHandler}
                    className='skip-button'>
                    Skip
                </Button>
            </div>
        );
    };

    render() {
        const { show } = this.props;
        const { selectedVoter, steps, currentStep } = this.state;

        if (!selectedVoter) return null;

        return (
            <Dialog className='bsc-multiple-match-dialog'
                show={show}
                closeButton
                onClose={this.onCloseHandler}
                title='Choose the correct match'
                actionButtons={this.renderActionButton()}>
                <BulletList steps={steps} currentStep={currentStep} />
                {this.renderDescription()}
                {this.renderVoterInfo()}
                {this.renderPotentialVoterList()}
            </Dialog>
        )
    }
}

MultipleMatchDialog.propTypes = {
    show: PropTypes.bool,
    voters: PropTypes.array,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func
};

MultipleMatchDialog.defaultProps = {
    show: true,
    voters: [],
    onClose: () => { },
    onSuccess: () => { }
};

export default MultipleMatchDialog;