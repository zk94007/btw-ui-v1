/**
 * Show progress bar with 10 steps
 *
 * @params step: Number
 * @return react Component
 */

import React from 'react'
import PropTypes from 'prop-types';
import cn from 'classnames'

const StepProgressBar = (props) => {
	const { step, numberOfSteps } = props
	const tenArray = [...Array(numberOfSteps).keys()]

	return (
		<div className='d-flex my-4'>
			{tenArray.map((_, index) => <span className={cn('btw-one-step', index < step && 'active')}></span>)}
		</div>
	)
}


StepProgressBar.propTypes = {
	/* showing step number */
    numberOfSteps: PropTypes.number,
    step: PropTypes.number,
};

StepProgressBar.defaultProps = {
	numberOfSteps: 10,
	step: 0
}

export default StepProgressBar