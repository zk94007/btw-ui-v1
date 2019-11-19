import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { SearchInput, VoterCardView } from '../shared'

/**
 * Show status string for result searched
 * @return {Status Component}
 */
const StatusBar = (props) => {
    const { isShow, count, keyword } = props
    if (!isShow || !keyword) {
        return (
            <div className='mb-4'>
                You have {count} voters in your list
			</div>
        )
    }
    return (
        <div className='mb-4'>
            We found {count} results for '{keyword}'
		</div>
    )
}

StatusBar.propTypes = {
    isShow: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    keyword: PropTypes.string.isRequired
}
StatusBar.defaultProps = {
    isShow: false,
    count: 0,
    keyword: ''
}

/**
 * Voters List
 * @param  {Array} list: voters list
 * @return {Component}
 */
const VotersList = (props) => {
    const { list, keyword, onSelectVoter } = props
    const [activeIndex, setActiveIndex] = useState('');

    const onSelectItem = index => () => {
        setActiveIndex(index)
        onSelectVoter(list[index])
    }

    return (
        <div className='btw-voter-list mt-5'>
            <StatusBar isShow={true} count={list.length} keyword={keyword} />
            {list.map((item, index) => {
                return (
                    <VoterCardView
                        key = {index}
                        data = {item}
                        keyword = {keyword}
                        active = {activeIndex === index}
                        onSelectItem = {onSelectItem(index)}
                    />)
                }
            )}
        </div>
    )
}
VotersList.propTypes = {
    /* action click handler for each voter */
    onSelectVoter: PropTypes.func.isRequired,
    /* voter list */
    list: PropTypes.array.isRequired,
    /* keyword searched */
    keyword: PropTypes.string,
}
VotersList.defaultProps = {
    list: []
}

/**
 * Voters list view with search input box
 * @param  {Array} list : voters list
 */
const VotersListView = (props) => {
    const [keyword, setKeyword] = useState('')
    const searchInputHandler = value => {
        setKeyword(value);
        onSearch(value);
    };
    const { list, onSearch } = props;

    return (
        <div className='btw-voter-list-view'>
            <SearchInput
                placeholder='Search by name or address'
                onChange={searchInputHandler} />
            <VotersList list={list} keyword={keyword} {...props} />
        </div>
    )
}
VotersListView.propTypes = {
    /* voter list */
    list: PropTypes.array.isRequired,
}
VotersListView.defaultProps = {
    list: []
}

export default VotersListView;