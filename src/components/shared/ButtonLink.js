import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const ButtonLink = (props) => {
	const aProps = {
		target: props.external ? '_blank' : '_self',
		onClick: props.onClick,
		...(props.link && { href: props.link }),
	}
	return (
		<div className={cn(props.className, 'd-inline-flex')}>
			<a 
				className={cn('btw-btn-link')}
				{...aProps}
			>
				{props.label}
			</a>
		</div>
	)
}

ButtonLink.propTypes = {
	link: PropTypes.string,
	onClick: PropTypes.func,
	label: PropTypes.string.isRequired,
	external: PropTypes.bool,
	className: PropTypes.string
}

ButtonLink.defaultProps = {
	link: '',
	onClick: () => {},
	external: false,
	label: ''
}

export default ButtonLink