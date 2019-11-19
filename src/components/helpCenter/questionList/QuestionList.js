import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from '../../shared';
import { QuestionFilters, QuestionItem } from './index'

class QuestionList extends BaseComponent {

    render() {
        const { questionsList } = this.props;

        return (
            <div className='btw-question-list btw-paper'>
                <QuestionFilters {...this.props} />

                {questionsList.map((question, index) => (
                    <QuestionItem key={index} question={question} />
                ))}
            </div>
        );
    }
}

QuestionList.propTypes = {
    questionsList: PropTypes.array,
    filterTypes: PropTypes.array,
    selectedFilter: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectFilter: PropTypes.func
};

export default QuestionList;