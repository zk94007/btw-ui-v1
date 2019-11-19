import React, { useState } from 'react';
import Select from 'react-select';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import filterLinks from '../../constants/VoterFilters'
import { Button, SvgIcon, Icon, BaseComponent } from '../shared';
import { isMobileOnly } from '../../helpers/DeviceHelper'

const Item = (props) => {
	const { filter, activeItem, onClickItem } = props;

	return (
		<div
			onClick={onClickItem(filter.label)}
			className={classNames('btw-voter-filter-item', { 'active-item': filter.label === activeItem })}>
			{filter.label}
		</div>
	)
};

const FilterItems = (props) => {
	const [activeItem, setActiveItem] = useState(filterLinks(isMobileOnly)[0].value);

	const onFilterSelect = filter => {
		setActiveItem(filter);

		if (props.onSelectFilter) {
			props.onSelectFilter(filter)
		}
	};

	const onClickItem = (filter) => event => {
		onFilterSelect(filter);
	};

	const onClickItemMobile = option => {
		const { value } = option;
		onFilterSelect(value);
	};

	const renderDesktopItems = items => {
		return (
			items.map((item, key) =>
				<Item
					key={key}
					filter={item}
					activeItem={activeItem}
					onClickItem={onClickItem}
					{...props}
				/>
			)
		)
	};

	const renderMobileItems = items => {

		return (
			<Select className={classNames('btw-voter-status-select', 'btw-voter-filter-mobile')}
				options={items}
				value={activeItem}
				onChange={onClickItemMobile} />
		)
	};

	const { isDesktop } = props;
	const items = filterLinks(!isDesktop);

	return (
		<div className={classNames('d-flex', {'justify-content-center': isDesktop })}>
			{ isDesktop
				? renderDesktopItems(items)
				: renderMobileItems(items)
			}
		</div>
	)
};

class FilterBar extends BaseComponent {
	render() {
		const { onSelectFilter, onGototAddVoter } = this.props;
		return (
			<div className='btw-voter-filter'>
				<Button size='medium' className='btw-voter-add-btn' onClick={onGototAddVoter}>
					<Icon name='plus-white' width={15} className='mr-3' />Add Voters
				</Button>
				<Row className='no-padding'>
					<Col sm={6} xs={6} md={12} lg={12} xl={12}>
						<FilterItems onSelectFilter={onSelectFilter} isDesktop={this.isDesktop()} />
					</Col>
					{ this.isMobileOnly() &&
						<Col xs={6} sm={6}>
							<div onClick={onGototAddVoter} className='d-flex justify-content-end align-content-center'>
								<SvgIcon name='small-plus' />
								<span className='add-voter-link-mobile'>Add Voter</span>
							</div>
						</Col> }
				</Row>
			</div>
		)
	}
}

FilterBar.propTypes = {
	onSelectFilter: PropTypes.func.isRequired,
	onGototAddVoter: PropTypes.func.isRequired
};

export default FilterBar;