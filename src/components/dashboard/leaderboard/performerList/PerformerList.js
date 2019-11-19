import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, PerformersTable } from '../../../shared';
import { PerformerFilters } from './index';

class PerformerList extends BaseComponent {

    render() {
        const { performers, onSelectPerformer, selectedPerformer } = this.props;

        return (
            <div className='btw-performer-list btw-paper'>
                <PerformerFilters {...this.props} />
                <PerformersTable
                    data={performers}
                    selectedItem={selectedPerformer}
                    onSelect={onSelectPerformer}
                />
            </div>
        );
    }
}

PerformerList.propTypes = {
    performers: PropTypes.array,
    selectedPerformer: PropTypes.object,
    filterTypes: PropTypes.array,
    selectedFilter: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectFilter: PropTypes.func,
    onSelectPerformer: PropTypes.func
};

export default PerformerList;