import React from 'react'
import PropTypes from 'prop-types'

import { RadioGroup, RadioOption } from '../../shared'

const ProfileAvatarOption = props => {
	return (
		<RadioGroup
			name='profile-avatar'
			value={props.value}
			onChange={props.onOptionChange}
		>
			<RadioOption value='initial'>Use initials</RadioOption>
			<RadioOption value='twitter'>Sync you profile picture with Twitter</RadioOption>
			<RadioOption value='google'>Sync you profile picture with Google</RadioOption>
			<RadioOption value='upload'>Upload an image</RadioOption>
		</RadioGroup>
	)
}

ProfileAvatarOption.propTypes = {
	value: PropTypes.oneOf(['initial', 'twitter', 'facebook', 'linkedin', 'upload']),
	onOptionChange: PropTypes.func.isRequired
}

ProfileAvatarOption.defaultProps = {
	value: 'initial'
}

export default ProfileAvatarOption