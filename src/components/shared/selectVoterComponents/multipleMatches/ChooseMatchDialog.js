import React from 'react';

import { BaseComponent, Button, Dialog } from '../../index';
import Description from './shared/Description';
import PotentialVoterList from './shared/PotentialVoterList';
import VoterInfo from './shared/VoterInfo';

class ChooseMatchDialog extends BaseComponent {

    state = {
        selectedPotentialVoter: ''
    };

    selectPotentialVoterHandler = potentialVoter => () => {
        this.setState({ selectedPotentialVoter: potentialVoter });
    };

    onFinishClick = () => {
        const { selectedPotentialVoter } = this.state;
        const { onClose, onFinish } = this.props;

        onFinish({...selectedPotentialVoter, potentialVoterId: selectedPotentialVoter.id });
        onClose();
    };

    onClose = () => {
      this.setState({ selectedPotentialVoter: null });
      this.props.onClose();
    };

    renderActionButton = () => {
        const { selectedPotentialVoter } = this.state;

        return (
            <div className='button-list'>
                <div className='button-sub-grouup'>
                    <Button
                        disabled={!selectedPotentialVoter}
                        onClick={this.onFinishClick}
                        className='match-button'>
                        Finish
                    </Button>
                </div>
            </div>
        )
    };

    render() {
        const { show, voter = {} } = this.props;
        const { firstname, lastname } = voter;
        const { selectedPotentialVoter } = this.state;

        return (
            <Dialog className='bsc-multiple-match-dialog'
                    show={show}
                    closeButton
                    onClose={this.onClose}
                    title='Choose the correct match'
                    actionButtons={this.renderActionButton()}>
                <Description firstname={firstname} lastname={lastname} />
                <VoterInfo selectedVoter={voter} />
                <PotentialVoterList selectedVoterId={(selectedPotentialVoter || {}).id}
                                    selectPotentialVoterHandler={this.selectPotentialVoterHandler}
                                    potentialVoters={voter.potentialVoters || []} />
            </Dialog>
        )
    }
}

export default ChooseMatchDialog;