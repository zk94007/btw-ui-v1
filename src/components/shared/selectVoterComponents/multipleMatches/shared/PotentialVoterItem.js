import React from 'react';
import classNames from 'classnames';

import { BaseComponent, SvgIcon, StatusIcon, VoterInfo, PopoverKeepOnHover } from '../../../index'

class PotentialVoterItem extends BaseComponent {

    handelSelect = isSameDistrict => e => {
        if (isSameDistrict) {
            this.props.onSelect(e);
        }
    };

    render() {
        const { isSelected, voter } = this.props;
        const { isSameDistrict } = voter;

        return (
            <div className={classNames('btw-potential-item', { 'potential-item-select': isSelected })} onClick={this.handelSelect(isSameDistrict)}>
                <div className='potential-info'>
                    { isSameDistrict
                        ? <SvgIcon
                            name={isSelected ? 'radio-button-selected' : 'radio-button'}
                            className='select-icon' />
                        :  <PopoverKeepOnHover
                                component={<div>This voter is not in your district</div>}>
                            <SvgIcon className='select-icon' name='alert-yellow' />
                           </PopoverKeepOnHover>
                    }
                    <VoterInfo
                        firstname={voter.firstname}
                        lastname={voter.lastname}
                        gender={voter.gender || 'Male'}
                        street={voter.address} />
                </div>
                <StatusIcon type={voter.voterStatusDesc} />
            </div>
        );
    }
}

export default PotentialVoterItem;