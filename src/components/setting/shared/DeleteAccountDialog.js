import React from 'react';
import PropTypes from 'prop-types'

import { Dialog, Button } from '../../shared'
import { isMobileOnly } from '../../../helpers/DeviceHelper'

const DeleteAccountDialog = props => (
	<Dialog
		className='btw-account-modal'
		show={props.open}
		onClose={props.onClose}
		title='Delete Your Account'
		actionButtons={[
			<Button key='btn-1' size='medium' color='red' onClick={props.onDelete} className={'primary'}>Delete Account</Button>,
			<Button key='btn-2' size='medium' onClick={props.onClose} className={'secondary'}>Cancel</Button>
		]}
		closeButton
	>
		Deleting your account will {isMobileOnly && <br />}<b>permanently</b> remove all your data.
	</Dialog>
)


DeleteAccountDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onDelete: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
}

DeleteAccountDialog.defaultProps = {
	open: false
}

export default DeleteAccountDialog;