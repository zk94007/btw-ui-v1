import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from './';

class Spinner extends BaseComponent {
	render() {
		const { loading, width = 80, height = 80 } = this.props;
		return loading ?
			( <div className='btw-spinner'>
				<div className='background' style={{ width, height }}>
					<div className='inner'></div>
				</div>
			  </div> )
			: null
	}
}

Spinner.propTypes = {
	loading: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number
};

export default Spinner;
