/**
 * Show Title and Description for Add voter page
 * @params title: String
 *         description1: String
 *         description2: String
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Typography } from '../index';

const TitleAndDescription = (props) => (
	<div className='d-flex flex-column'>
		<Typography className='mb-4'>
		    {props.title}
		</Typography>
		<Typography className='' variant='body'>
		    {props.description1}
		</Typography>
		<br/>
		<Typography className='' variant='body' dangerouslySetInnerHTML={{ __html: props.description2 }} />		
	</div>
)

TitleAndDescription.propTypes = {
    title: PropTypes.string.isRequired,
    description1: PropTypes.string,
    description2: PropTypes.string,
};

TitleAndDescription.defaultProps = {
	title: '',
	description1: '',
	description2: ''
}

export default TitleAndDescription