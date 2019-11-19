import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { BaseComponent, Button, Typography, VoterAvatar } from '../../shared';

class QuestionItem extends BaseComponent {

    askButtonHandler = () => {
    }

    renderStatus = (count, title) => {
        return (
            <div className='status-item'>
                <Typography lightColor>{count}</Typography>
                <Typography lightColor variant='functional' fontWeight='600'>{title}</Typography>
            </div>
        )
    }

    renderCreator = () => {
        const { question: { creator, createdAt } } = this.props;
        const { firstName, lastName, avatar } = creator;

        return (
            <div className='question-creator'>
                <VoterAvatar
                    size={16}
                    firstName={firstName}
                    lastName={lastName}
                    src={avatar}
                    noBorder />
                <Typography variant='body' className='creator-name'>{`${firstName} ${lastName}`}</Typography>
                <Typography variant='body' lightColor>{moment(createdAt).fromNow()}</Typography>
            </div>
        )
    }

    renderTags = () => {
        const { question: { tags } } = this.props;
        const lastIndex = tags.length - 1;

        return (
            <div className='question-tags'>
                {tags.map((tag, index) => (
                    <Typography
                        key={index}
                        variant='body'
                        lightColor
                        className='question-tag-item'>
                        {tag} {lastIndex !== index && '  • '}
                    </Typography>
                ))}
            </div>
        )
    }

    renderActionButtons = () => {
        return (
            <div className='question-buttons'>
                <Button size='small' color='blue' className='answer-button'>
                    <i className='fa fa-pencil' />
                    Answer
                </Button>
                <Button size='small' color='white' className='save-button'>
                    Save
                </Button>
            </div>
        )
    }

    render() {
        const { question } = this.props;

        return (
            <div className='btw-question-item'>
                <div className='question-status'>
                    {this.renderStatus(question.answers, 'answers')}
                    {this.renderStatus(question.saved, 'saved')}
                </div>
                <div className='question-content'>
                    <div className='question-header'>
                        {this.renderCreator()}
                        {this.renderTags()}
                    </div>
                    <Typography className='question-title'>
                        {question.title}
                    </Typography>
                    <Typography variant='body' className='question-description'>
                        {question.description}
                    </Typography>
                    {this.renderActionButtons()}
                </div>
            </div>
        );
    }
}

QuestionItem.propTypes = {
    question: PropTypes.object
};

export default QuestionItem;