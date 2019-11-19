import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from 'react-router-dom'

import { updateVoter } from '../../../actions';
import {
    BaseComponent,
    Typography,
    VoterAction,
    VoterProfile,
    VoterCommunication,
    CommentItem,
    CommentEditor
} from '../index';

class VoterDetail extends BaseComponent {

    constructor() {
        super();
        this.state = {
            currentComment: {
                text: '',
                images: []
            },
            currentIndex: -1,
            comments: []
        }
    }

    componentDidMount() {
        const { selectedVoter: { comments } } = this.props;
        if (!!comments) {
            this.setState({ comments });
        }
    }

    componentDidUpdate(prevProps) {
        const { selectedVoter } = this.props;
        if (prevProps.selectedVoter.id !== selectedVoter.id) {
            const { comments } = selectedVoter;
            if (!!comments) {
                this.setState({ comments });
            }
        }
    }

    onSelectComment = (index, comment) => () => {
        this.setState({ currentIndex: index, currentComment: comment });
    }

    onDeleteComment = index => () => {
        let { comments } = this.state;
        comments = [...comments.slice(0, index), ...comments.slice(index + 1)];

        this.updateVoterHandler(comments);
    }

    onSaveComment = currentComment => {
        let { comments, currentIndex } = this.state;

        if (currentIndex < 0) {
            comments = [...comments, { ...currentComment, createdAt: moment() }];
        } else {
            comments[currentIndex].text = currentComment.text;
            comments[currentIndex].images = currentComment.images;
        }

        this.updateVoterHandler(comments);
    }

    onCancelComment = () => {
        this.setState({ currentIndex: -1, currentComment: { text: '', images: [] } });
    }

    updateVoterHandler = (comments) => {
        let { selectedVoter, actions } = this.props;
        selectedVoter = { ...selectedVoter, comments };

        actions.updateVoter(selectedVoter.id, selectedVoter);
        this.setState({ comments });
        this.onCancelComment();
    }

    renderComments = () => {
        const { currentComment, currentIndex, comments } = this.state;
        const { selectedVoter } = this.props;

        return (
            <div className='comments-content'>
                <Typography variant='body' fontWeight='600' className='title'>
                    {`Updates (${comments.length})`}
                </Typography>
                {comments.map((comment, index) => (
                    <CommentItem
                        key={index}
                        comment={comment}
                        voter={selectedVoter}
                        onEdit={this.onSelectComment(index, comment)}
                        onDelete={this.onDeleteComment(index, comment)} />
                ))}
                <CommentEditor
                    isAdd={currentIndex < 0}
                    voter={selectedVoter}
                    comment={currentComment}
                    onCancel={this.onCancelComment}
                    onSave={this.onSaveComment} />
            </div>
        )
    }


    render() {
        const { selectedVoter, changeStatusHandler } = this.props;

        return (
            <div className={classNames('btw-voter-detail-info btw-paper')}>
                <VoterProfile selectedVoter={selectedVoter} changeStatusHandler={changeStatusHandler} />
                <VoterCommunication selectedVoter={selectedVoter} />
                <VoterAction selectedVoter={selectedVoter} />
                { this.renderComments() }
            </div>
        );
    }
}

VoterDetail.propTypes = {
    selectedVoter: PropTypes.object,
    changeStatusHandler: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ updateVoter }, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(withRouter(VoterDetail));