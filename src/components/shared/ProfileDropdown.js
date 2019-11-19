import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

import { Icon, BaseComponent } from '../shared';
import coinImage from '../../resources/images/coin.png';
import routes from '../../constants/Routes';

/**
 * Profile title on header bar
 * @param  {name: String, level: string, size: number}
 * @return {Avatar and description (name and level) of Profile}
 */
const ProfileTitle = (props) => {
	return (
		<div className='d-flex'>			
			{props.src ? 
				<img className='rounded-circle' src={props.src} width={props.size} height={props.size} alt=""/>
				: <Icon name='profile' width={props.size} height={props.size} />
			}
			{props.detail && 
				<div className='d-flex flex-column justify-content-center btw-avatar-title ml-2'>
					<h6 className='btw-avatar-name'>{props.name}</h6>
					<h6 className='btw-avatar-email'>{props.email}</h6>
				</div>
			}
		</div>
	)
};

ProfileTitle.propTypes = {
	/* user avatar src, show default image if empty */
	src: PropTypes.string,
	/* avatar size */
	size: PropTypes.string.isRequired,
	/* boolean if user's profile detail is visible or not */
	detail: PropTypes.bool,
	/* user's name */
	name: PropTypes.string.isRequired,
	/* user's email */
	email: PropTypes.string.isRequired,
};

ProfileTitle.defaultProps = {
	src: '',
	name: '',
	email: '',
	detail: false
};

/**
 * Show profile's level and coins in dropdow menu on header
 * @param  String level	: user's level
 * @param  Number coin	: user's coin number
 */
const ProfileLevel = (props) => {
	return (
		<div className='d-flex flex-column btw-profile-level'>
			<div className='mb-3'>
				<h6 className='level-caption'>Current Level:</h6>
				<h6 className='level-value'>{props.level}</h6>
			</div>
			<div>
				<h6 className='level-caption'>Points balance:</h6>
				<h6 className='level-value'><img src={coinImage} alt=""/>{props.coin}</h6>
			</div>
		</div>
	)
};
ProfileLevel.propTypes = {
	/* user's level */
	level: PropTypes.string.isRequired,
	/* user's own coin number */
	coin: PropTypes.number.isRequired,
};
ProfileLevel.defaultProps = {
	level: 'Captain',
	coin: 0
};

/**
 * Profile Dropdown on Header bar
 * @param  {profile info, handle actions (Please check prop-types)}
 * @return {Profile dropdown component}
 */

class ProfileDropdown extends BaseComponent {

	handleMenuClick = route => () => {
		this.onLink(route);
	};

	render() {
		const { props }= this;
		const size = props.isMobile() ? '50px' : '40px';
		const name = `${props.firstname} ${props.lastname}`;
		const level = props.role;
		const data = {
			size,
			level,
			name: name.trim() ? name : props.nickname,
			src: props.profileImageUrl || '',
			email: props.email
		};

		return (
			<div className='justify-content-end'>
				<Dropdown
					alignRight
					className='btw-nav-dropdown'
					id='nav-dropdown'>
					<Dropdown.Toggle id="dropdown-basic">
						<Icon className='menu-icon' name='menu' ext='svg' width={22} height={22} />
						<div className='menu-profile'><ProfileTitle {...data} /></div>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item eventKey={1.1}>
							<ProfileTitle {...data} detail={true} />
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item eventKey={1.2}>
							<ProfileLevel {...data} />
						</Dropdown.Item>
						<Dropdown.Divider />
						{ this.isMobile &&
							<>
								<Dropdown.Item onClick={this.handleMenuClick(routes.captainsDashboard)}>
									Home
								</Dropdown.Item>
								<Dropdown.Item onClick={this.handleMenuClick(routes.voterList)}>
									Voters
								</Dropdown.Item>
								<Dropdown.Item onClick={this.handleMenuClick(routes.tasksList)}>
									Actions
								</Dropdown.Item>
							</>
						}
						<Dropdown.Item eventKey={1.3} onClick={props.btwSettings}>
							<Icon className='menu-icon' name='settings' ext='svg' width={15} height={15} />Account Settings
						</Dropdown.Item>
						<Dropdown.Item eventKey={1.4} onClick={props.btwLogout}>
							<Icon className='menu-icon' name='logout' ext='svg' width={15} height={15} />Log Out
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		)
	}
}



ProfileDropdown.propTypes = {
	/* user's first name */
	firstname: PropTypes.string.isRequired,
	/* user's last name */
	lastname: PropTypes.string.isRequired,
	/* user's role */
	role: PropTypes.string.isRequired,
	/* logut action handler */
	btwLogout: PropTypes.func.isRequired,
	/* link handler for settings page */
	btwSettings: PropTypes.func.isRequired,
	/* handler to check if mobile view or not */
	isMobile: PropTypes.func.isRequired,
};

ProfileDropdown.defaultProps = {
	firstname: '',
	lastname: '',
	role: ''
};

export default ProfileDropdown