import React from 'react';
import classNames from 'classnames';

import { BaseComponent, SvgIcon, Typography } from '../../shared'

class SelectDistrictItem extends BaseComponent {

    render() {
        const { isSelected, district, onSelect } = this.props;

        return (
            <div className={classNames('btw-district-item', { 'district-item-select': isSelected })} onClick={onSelect}>
                <SvgIcon name={isSelected ? 'radio-button-selected' : 'radio-button'} />
                <Typography variant='functional' fontWeight='600' className='district-name'>
                    {district.name}
                </Typography>
            </div>
        );
    }
}

export default SelectDistrictItem;