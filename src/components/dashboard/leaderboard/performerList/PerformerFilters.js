import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonGroup } from 'react-bootstrap';

import { BaseComponent, SearchInput, Button } from '../../../shared';

class PerformerFilters extends BaseComponent {

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
            <div className='btw-performer-filter'>
                <SearchInput
                    hideButton
                    placeholder='Search Captains'
                    value={searchString}
                    onChange={onSearch}
                    className='search-input' />
                <div className='button-group'>
                    {this.renderFiltersGroup()}
                </div>
            </div>
        );
    }
}

PerformerFilters.propTypes = {
    filterTypes: PropTypes.array,
    selectedFilter: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectFilter: PropTypes.func
};

export default PerformerFilters;