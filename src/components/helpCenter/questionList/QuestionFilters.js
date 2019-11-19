import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonGroup } from 'react-bootstrap';

import { BaseComponent, SearchInput, Button } from '../../shared';

class QuestionFilters extends BaseComponent {

    askQuestionHanlder = () => {
    }

    renderFiltersGroup = () => {
        const { filterTypes, selectedFilter, onSelectFilter } = this.props;

        return (
            <ButtonGroup className='filter-group'>
                {
                    filterTypes.map((filter, index) => (
                        <Button
                            key={index}
                            color='white'
                            size='medium'
                            onClick={() => onSelectFilter(filter)}
                            className={classNames('filter-button', { 'filter-select': selectedFilter === filter })}>
                            {filter}
                        </Button>
                    ))
                }
            </ButtonGroup>
        )
    }

    render() {
        const { searchString, onSearch } = this.props;

        return (
            <div className='btw-question-filters'>
                <SearchInput
                    hideButton
                    placeholder='Search among 875 questions'
                    value={searchString}
                    onChange={onSearch}
                    className='search-input' />
                <div className='button-group'>
                    {this.renderFiltersGroup()}
                    <Button size='medium' onClick={this.askQuestionHanlder} className='ask-button'>
                        Ask Question
                    </Button>
                </div>

            </div>
        );
    }
}

QuestionFilters.propTypes = {
    filterTypes: PropTypes.array,
    selectedFilter: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectFilter: PropTypes.func
};

export default QuestionFilters;