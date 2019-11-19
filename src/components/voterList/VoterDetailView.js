import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { updateVoter } from '../../actions';
import { BaseComponent, VoterDetail } from '../shared';

class VoterDetailView extends BaseComponent {
    changeStatusHandler = (value) => {
        const { actions, voter } = this.props;
        const selectedVoter = { ...voter, voterStatus: value };

        actions.updateVoter(selectedVoter.id, selectedVoter);
    };

    render() {
        const { voter } = this.props;
        return (
            <Row className='no-gutters px-4'>
                <Col>
                    <VoterDetail
                        selectedVoter={voter}
                        changeStatusHandler={this.changeStatusHandler}
                    />
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state, props) => {
    const { location: { state: { id } = {} } } = props;

    const { voterList: { voters = []} = {} } = state;

    return {
      voter: voters.find(voter => voter.id === id) || {}
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateVoter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterDetailView));
