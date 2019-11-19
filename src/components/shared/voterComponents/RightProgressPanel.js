/**
 * show Right side panel in add voter page to display steps
 *
 * @params added:Number 
 * @params onNextStep:Function
 * @return React Component
 */
import React from 'react'
import PropTypes from 'prop-types';

import { Typography, Button, StepProgressBar } from '../index'

const RightProgressPanel = (props) => {
	return (
		<div className='btw-paper p-4'>
			<div className='d-flex justify-content-between'>
				<Typography variant='body'><strong>Added: {props.added}</strong></Typography>
				<Typography variant='body'>Clear all</Typography>
			</div>
			<StepProgressBar step={props.added} />
			<div className='d-flex'>
				<Button onClick={props.onNextStep} disabled> Next Step </Button>
			</div>
		</div>
	)
}

RightProgressPanel.propTypes = {
	/* show numbers added */
    added: PropTypes.number,
    /* click handler for next step */
    onNextStep: PropTypes.func.isRequired,
};

RightProgressPanel.defaultProps = {
	added: 0,
}

export default RightProgressPanel