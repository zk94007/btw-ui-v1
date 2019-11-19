/**
 * Wrapper for components shared
 */
import BaseComponent from './BaseComponent'
import ProfileDropdown from './ProfileDropdown'
import Logo from './Logo'
import Icon from './Icon'
import Arrow from './Arrow'
import AutoComplete from './Autocomplete'
import Button from './Button'
import ButtonLink from './ButtonLink'
import Checkbox from './Checkbox'
import ConfirmationDialog from './ConfirmationDialog'
import Dialog from './Dialog'
import Paginator from './Paginator'
import Paper from './Paper'
import SearchInput from './SearchInput'
import SocialIcon from './SocialIcon'
import SocialList from './SocialList'
import SocialItem from './SocialItem'
import Spinner from './Spinner'
import StatusIcon from './StatusIcon'
import SvgIcon from './SvgIcon'
import Typography from './Typography'
import {
	VoterCardView,
	VoterInfo,
	VoterAvatar,
	VoterAction,
	VoterActionItem,
	VoterCommunication,
	VoterProfile,
	VoterDetail,
	TitleAndDescription,
	StepProgressBar,
	RightProgressPanel
} from './voterComponents'
import {
	SocialInfo,
	VoterNotFound,
	ConnectListInfo,
	VotersProgressBar,
	VotersTable,
	UploadFileDialog,
	SocialConnectDialog,
	MultipleMatchDialog,
	PotentialVoterItem
} from './selectVoterComponents'

import VoterStatusDropdown from './VoterStatusDropdown'
import Tabs from './Tabs';
import { SubTaskItem, TaskCompleteDialog, ActionItem, TaskProgressBar, CongratsDialog, ExtraCongratsDialog } from './taskComponents'
import {
	EmailInput,
	FirstNameInput,
	LastNameInput,
	PasswordInput,
	TextInput,
	RadioOption,
	RadioGroup,
	TextArea
} from './validatedInputs'
import { CongratsAlarm, ErrorAlarm } from './alarmComponents'
import { VoterPerformer, PerformersTable } from './performComponents'
import SwitchButton from './SwitchButton'
import PopoverKeepOnHover from './PopoverKeepOnHover'
import { CommentEditor, CommentItem } from './commentComponents'
import './styles/index.scss';

export {
	BaseComponent,
	ProfileDropdown,
	Logo,
	Icon,
	Arrow,
	AutoComplete,
	Button,
	Checkbox,
	ConfirmationDialog,
	Dialog,
	Paginator,
	Paper,
	SearchInput,
	SocialIcon,
	SocialList,
	SocialItem,
	Spinner,
	StatusIcon,
	SvgIcon,
	TaskProgressBar,
	Typography,
	VoterAvatar,
	VoterAction,
	VoterActionItem,
	VoterCommunication,
	VoterProfile,
	VotersProgressBar,
	VotersTable,
	UploadFileDialog,
	SocialConnectDialog,
	MultipleMatchDialog,
	PotentialVoterItem,
	VoterInfo,
	VoterCardView,
	VoterDetail,
	VoterStatusDropdown,
	ActionItem,
	Tabs,
	SubTaskItem,
	TaskCompleteDialog,
	TitleAndDescription,
	StepProgressBar,
	RightProgressPanel,
	SocialInfo,
	VoterNotFound,
	ConnectListInfo,
	EmailInput,
	FirstNameInput,
	LastNameInput,
	PasswordInput,
	TextInput,
	TextArea,
	CongratsAlarm,
	ErrorAlarm,
	VoterPerformer,
	RadioOption,
	RadioGroup,
	PerformersTable,
	SwitchButton,
	ButtonLink,
	PopoverKeepOnHover,
	CongratsDialog,
	ExtraCongratsDialog,
	CommentEditor,
	CommentItem
}
