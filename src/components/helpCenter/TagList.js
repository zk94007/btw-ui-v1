import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography } from '../shared';

class TagList extends BaseComponent {

    constructor() {
        super();
        this.state = {
            isShowAll: false
        }
    }

    viewAllHandler = () => {
        this.setState((prevState) => ({
            isShowAll: !prevState.isShowAll
        }));
    }

    renderViewAllButton = () => {
        const { isShowAll } = this.state;

        return (
            <span
                className='view-all'
                onClick={this.viewAllHandler}>
                {isShowAll ? 'Close' : 'View All'}
            </span>
        );
    }

    renderTagItem = (tag, i) => {
        const { onTagSelect } = this.props;

        return (
            <Typography key={i} variant='functional' className='tag-item' onClick={() => onTagSelect(tag)} >
                {tag}
            </Typography>
        );
    }

    renderTagList = () => {
        const { isShowAll } = this.state;
        const { tags, minTags } = this.props;

        return (
            <div className='tag-list'>
                {[...Array(isShowAll ? tags.length : minTags)].map((e, i) => (
                    this.renderTagItem(tags[i], i)
                ))}
            </div>
        )
    }

    render() {

        return (
            <div className='btw-tag-list btw-paper'>
                <Typography className='title'>
                    Popular Tags:
                </Typography>
                {this.renderTagList()}
                {this.renderViewAllButton()}
            </div>
        );
    }
}

TagList.propTypes = {
    tags: PropTypes.array,
    minTags: PropTypes.number,
    onTagSelect: PropTypes.func
};

TagList.defaultProps = {
    minTags: 10
}

export default TagList;