import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Row, Col, Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { loadVoterList, updateVoter } from '../../actions';
import { BaseComponent, VoterDetail, Spinner } from '../shared'
import { Routes } from '../../constants'
import { VotersList, FilterBar } from './index'
import searchHelper from './searchHelper';
import filterHelper from './filterHelper';

class VotersManagement extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedVoter: undefined,
            searchString: '',
            filter: 'ALL VOTERS'
        };
        if (!props.isSuccess) {
            this.props.actions.loadVoterList();
        }
    }

    componentDidMount() {
        const { voters } = this.props;
        if (voters.length !== 0) {
            this.setState({ selectedVoter: voters[0] });
        }
    }

    componentWillReceiveProps(props) {
        const { voters } = props;
        if (!this.state.selectedVoter) {
            this.setState({ selectedVoter: voters[0] });
        }
    }

    changeStatusHandler = (value) => {
        const { actions } = this.props;
        let { selectedVoter } = this.state;
        selectedVoter = { ...selectedVoter, voterStatus: value };

        actions.updateVoter(selectedVoter.id, selectedVoter);
        this.setState({ selectedVoter });
    };

    onSelectVoter = item => {
        if (this.isMobile()) {
            this.props.history.push({
                pathname: `${Routes.voterDetail}`,
                state: { id: item.id }
            });
        }
        this.setState({ selectedVoter: item });
    };

    onSelectFilter = filter => {
        this.setState({ filter });
    };

    onGototAddVoter = () => {
        this.onLink(Routes.addVoter)
    };

    onSearch = value => {
      this.setState({ searchString: value });
    };

    render() {
        const { selectedVoter, searchString, filter } = this.state;
        const { voters, isFetching } = this.props;

        return (
            <Container className='btw-voter-page'>
                <Spinner loading={isFetching} />
                <Row className='text-center'>
                    <Col>
                        <FilterBar
                            onSelectFilter={this.onSelectFilter}
                            onGototAddVoter={this.onGototAddVoter}
                            {...this.props}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={6}>
                        <VotersList
                            onSearch={this.onSearch}
                            list={searchHelper.search(filterHelper.filter(voters, filter), searchString)}
                            onSelectVoter={this.onSelectVoter}
                            {...this.props}
                        />
                    </Col>
                    <Col md={12} lg={6}>
                            { !this.isMobileOnly() && selectedVoter &&
                                <VoterDetail
                                    selectedVoter={selectedVoter}
                                    changeStatusHandler={this.changeStatusHandler}
                                />
                            }
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { voters, isFetching, isSuccess, error } = state.voterList;

    return {
        voters,
        isFetching,
        isSuccess,
        error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ loadVoterList, updateVoter }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VotersManagement));
