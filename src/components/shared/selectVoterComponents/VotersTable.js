import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash';
import VirtualList from 'react-tiny-virtual-list';

import { BaseComponent, Checkbox, PopoverKeepOnHover, SocialList, StatusIcon, SvgIcon, Button, MultipleMatchDialog } from '..';
import { ChooseMatchDialog } from '../selectVoterComponents/multipleMatches';
import {
    actionImportSuccess
} from '../../../actions';


class VotersTable extends BaseComponent {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = {
            showMatchDialog: false,
            isMultiMatchDialogShow: data.some(({ potentialVoters = []}) => potentialVoters.length > 0)
        };
    }

    isSelect = () => {
        return this.props.type === 'select';
    };

    clearHandler = (id) => {
        let { selectedData, onSelect } = this.props;

        _.remove(selectedData, { id });

        onSelect(selectedData);
    };

    addHandler = (item) => {
        let { selectedData, onSelect, maxSelectedVoters } = this.props;
        if ((selectedData.length >= maxSelectedVoters) && this.isSelect()) {
            return null;
        }
        selectedData = [
            ...selectedData,
            item
        ];
        onSelect(selectedData);
    };

    checkboxHandler = (value, item) => {
        value ?
            this.addHandler(item) :
            this.clearHandler(item.id);
    };

    isSelected = (id) => {
        const { selectedData } = this.props;

        const targetIndex = selectedData.findIndex(item => (
            item.id === id
        ));

        return targetIndex >= 0;
    };

    onMatchDialogClose = () => {
        this.setState({ showMatchDialog: false });
    };

    onMatchClick = item => () => {
        this.setState({
            showMatchDialog: true,
            selectedVoter: item
        });
    };

    onSelectMatchVoter = voter => {
        const { selectedVoter } = this.state;
        const { data, actions } = this.props;
        const voterIndex = data.indexOf(selectedVoter);
        data[voterIndex] = voter;
        actions.actionImportSuccess(data);
    };

    onSuccessMultiMatchDialog = matchedVoters => {
        this.setState({ isMultiMatchDialogShow: false });
        this.props.actions.actionImportSuccess(matchedVoters);
    };

    onCloseMultiMatchDialog = () => {
        this.setState({ isMultiMatchDialogShow: false })
    };

    getInitSocialStatus = () => ({ google: false, twitter: false, linkedin: false })

    renderDesktopHeader = () => {
        return (
            <Row>
                <Col md={1} className='check' />
                <Col md={6} className='name'>Name</Col>
                <Col md={2}>Connected On</Col>
                <Col md={3} >Status</Col>
            </Row>
        );
    };

    renderVoterInfo = (item) => {
        const { firstname, lastname, gender = '', address = '' } = item;

        return (
            <>
                <div className='name'>
                    {firstname} {lastname}
                </div>
                <div className='description'>
                    {`${gender || ''} | ${address || ''}`}
                </div>
            </>
        );
    };

    renderRowCheckbox = (item, iconClass) => {
        if (item.hasVoter) {
            return <SvgIcon className={iconClass} name='alert-yellow' />;
        }
        if (!item.isSameDistrict) {
            return (
                <PopoverKeepOnHover
                    component={<div>This voter is not in your district</div>}>
                    <SvgIcon className={iconClass} name='alert-yellow' />
                </PopoverKeepOnHover>
            )
        }
        if (item.potentialVoterId === null) {
            return <SvgIcon className={iconClass} name='alert-red' />;
        }

        return <Checkbox onChange={(value) => this.checkboxHandler(value, item)} checked={this.isSelected(item.id)} />
    };

    renderRowStatus = item => {
      if (item.potentialVoterId === null) {
        return <Button size='small' color='white' onClick={this.onMatchClick(item)}>Choose match</Button>
      }
      return <StatusIcon type={item.voterStatus || 'INACTIVE'} />
    };

    renderBody = () => {
        const { data } = this.props;
        const { availHeight, availWidth } = window.screen;

        const paddingSize = this.isTablet() ? 120 : 40;

        const width = this.isDesktop() ? 795 : availWidth - paddingSize;
        const height = this.isDesktop() ? 600 : availHeight - paddingSize;

        return (
            <>
                { !this.isMobileOnly() && <div className='desktop-header'>{this.renderDesktopHeader()}</div> }
                <VirtualList
                    width={width}
                    height={height}
                    itemCount={data.length}
                    itemSize={63.5}
                    renderItem={({index, style}) => {
                        const { data } = this.props;
                        const item = data[index];


                        return this.isMobileOnly() ?
                                (
                                <div className={classNames('d-flex justify-content-between mobile-body no-margin voter', {'selected-row': this.isSelected(item.id)})}>
                                    <div className='d-flex justify-content-start'>
                                        <div>{ this.renderRowCheckbox(item, 'check') }</div>
                                        <div className='voter-info'>{this.renderVoterInfo(item)}</div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <SocialList social={item.socialNetwork || this.getInitSocialStatus()} showVoterFile />
                                        <div className='status-div'>
                                            {this.renderRowStatus(item)}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                            <Row key={index} style={style} className={classNames('desktop-body no-margin voter', {'selected-row': this.isSelected(item.id)})}>
                                <Col md={1} className='column'>
                                    <div className='check'>{this.renderRowCheckbox(item)}</div>
                                </Col>
                                <Col md={5} className='column'>
                                    <div>{this.renderVoterInfo(item)}</div>
                                </Col>
                                <Col md={3} className='column social'>
                                    <SocialList social={item.socialNetwork || this.getInitSocialStatus()} showVoterFile/>
                                </Col>
                                <Col md={3} className='column status no-padding'>
                                    {this.renderRowStatus(item)}
                                </Col>
                            </Row>
                        )}}
                    />
            </>
        )
    };

    renderMultiMatchDialog = () => {
        const { isMultiMatchDialogShow } = this.state;
        const { data } = this.props;

        return (
            <MultipleMatchDialog
                show={isMultiMatchDialogShow}
                onClose={this.onCloseMultiMatchDialog}
                onSuccess={this.onSuccessMultiMatchDialog}
                voters={data.filter(({ potentialVoters = [] }) => potentialVoters.length > 1)} />
        )
    };

    render() {
        const { className } = this.props;
        const { showMatchDialog, selectedVoter } = this.state;
        return (
            <div className={classNames('btw-voters-table', className)}>
                { this.renderBody() }
                { this.renderMultiMatchDialog() }
                <ChooseMatchDialog show={showMatchDialog}
                                   voter={selectedVoter}
                                   onFinish={this.onSelectMatchVoter}
                                   onClose={this.onMatchDialogClose} />
            </div >
        );
    }
}

VotersTable.propTypes = {
    type: PropTypes.oneOf(['select', 'add']),
    data: PropTypes.array,
    selectedData: PropTypes.array,
    maxSelectedVoters: PropTypes.number,
    onSelect: PropTypes.func
};

VotersTable.defaultProps = {
    maxSelectedVoters: 20,
    type: 'select'
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        actionImportSuccess
    }, dispatch)
});

export default connect(null, mapDispatchToProps)(VotersTable);

