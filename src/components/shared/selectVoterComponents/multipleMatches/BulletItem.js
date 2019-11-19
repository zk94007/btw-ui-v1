import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BaseComponent, SvgIcon } from '../../index';

class BulletItem extends BaseComponent {

	renderSmallIcon = () => {
		const { status, isLast, isActive, stepNumber } = this.props;

		switch (status) {
			case 'default':
				if (isActive) {
					return <div className='large-icon active'>{stepNumber}</div>
				}
				if (isLast) {
					return <div className='large-icon default'>{stepNumber}</div>
				}
				return <div className='small-icon default' />
			case 'select':
				return <div className='small-icon select' />
			case 'skip':
				return <div className='small-icon skip' />
			default:
				return null;
		}
	}

	renderLargeIcon = () => {
		const { status, isLast, isActive, stepNumber } = this.props;

		switch (status) {
			case 'default':
				if (isActive) {
					return <div className='large-icon active'>{stepNumber}</div>
				}
				if (isLast) {
					return <div className='large-icon default'>{stepNumber}</div>
				}
				return <div className='large-icon default'>{stepNumber}</div>
			case 'select':
				return <SvgIcon name='step-check' />
			case 'skip':
				return <SvgIcon name='step-skip' />
			default:
				return null;
		}
	}

	renderLine = () => {
		return <div className='line-border' />
	}

	render() {
		const { isSmall, stepNumber, isLast } = this.props;

		return (
			<div className='btw-bullet-item'>
				<div className={classNames('line-item', { 'line-border': stepNumber !== 1 })} />
				{isSmall ?
					this.renderSmallIcon() :
					this.renderLargeIcon()
				}
				<div className={classNames('line-item', { 'line-border': !isLast })} />
			</div>
		)
	}
}

BulletItem.propTypes = {
	status: PropTypes.oneOf(['default', 'select', 'skip']),
	isSmall: PropTypes.bool,
	isLast: PropTypes.bool,
	isActive: PropTypes.bool,
	stepNumber: PropTypes.number
};

BulletItem.defaultProps = {
	status: 'default',
	isSmall: false,
	isLast: false,
	isActive: false,
	stepNumber: 0
}

export default BulletItem;