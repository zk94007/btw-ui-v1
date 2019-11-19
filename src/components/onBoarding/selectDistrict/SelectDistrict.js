import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import _ from 'lodash';

import AuthStorage from '../../../storage/AuthStorage'
import { getDistrictByAddress, getDistrictSearchList, selectDistrict, updateProfile, updateOnboardingByDistrict } from '../../../actions';
import { BaseComponent, Button, Typography, AutoComplete } from '../../shared'
import { SelectDistrictItem } from './index';
import './styles/index.scss';

class SelectDistrict extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedDistrict: {},
            searchString: ''
        }
    }

    getSearchAutoItem = (searchList) => {
        return searchList.map((e, index) => ({ id: index, label: searchList[index].name }));
    };

    searchInputHandler = (value) => {
        this.setState({ searchString: value });
        this.props.actions.getDistrictSearchList(value);
    };

    selectSearchItemHandler = (value, item) => {
        const { searchString } = this.state;

        if (!!value.label) {
            this.props.actions.getDistrictByAddress(searchString)
        }
    };

    selectDistrictHandler = district => () => {
        this.setState({ selectedDistrict: district });
    };

    onNextHandler = () => {
        const { actions, user } = this.props;
        actions.selectDistrict(this.state.selectedDistrict);
        actions.updateProfile(updateOnboardingByDistrict(user, this.state.selectedDistrict.ocdId, true), true)
    };

    renderDistrictList = () => {
        const { districts } = this.props;
        const { selectedDistrict } = this.state;

        return (
            <div className={'districts-list'}>
                {districts.map((disctrict, index) => (
                    <SelectDistrictItem
                        key={index}
                        district={disctrict}
                        isSelected={disctrict.ocdId === selectedDistrict.ocdId}
                        onSelect={this.selectDistrictHandler(disctrict)} />)
                )}
            </div>
        )
    };

    renderSearchDescription = () => {
        const { searchString } = this.state;

        if (!searchString) {
            return (
                <Typography variant='body' lightColor className='description'>
                    Enter your ZIP code to find a voting district you are
                    attached to. You can change the district anytime.
                </Typography>
            )
        }
    };

    renderSearchResult = () => {
        const { districts } = this.props;
        const { selectedDistrict, searchString } = this.state;

        if (!!searchString) {
            return (
                <>
                    <Typography variant='body' lightColor className='description-result'>
                        The information you provided overlaps {districts.length} voting districts. Please, select one:
                    </Typography>
                    {this.renderDistrictList()}
                    <div className='button-content'>
                        <Button fullWidth disabled={_.isEmpty(selectedDistrict)} onClick={this.onNextHandler}>
                            Next
                        </Button>
                    </div>
                </>
            )
        }
    };

    render() {
        const { districtSearchList } = this.props;
        const { searchString } = this.state;

        return (
            <Container className='btw-paper btw-select-disctrict'>
                <Typography className='title'>Select voting district</Typography>
                {this.renderSearchDescription()}
                <AutoComplete
                    className='search-box'
                    placeholder='Search by ZIP, Address, City'
                    items={this.getSearchAutoItem(districtSearchList)}
                    value={searchString}
                    onSelect={this.selectSearchItemHandler}
                    onChange={this.searchInputHandler} />
                {this.renderSearchResult()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { error, districts, districtSearchList, isSuccess, isFetching } = state.districtList;
    const user = AuthStorage.getLoggedUser();

    return {
        user,
        error,
        districts,
        districtSearchList,
        isFetching,
        isSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getDistrictByAddress, selectDistrict, getDistrictSearchList, updateProfile }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectDistrict));