export const Links = [
	{
		label:'ACTIVE',
		value: 'ACTIVE'
	}, {
		label:'INACTIVE',
		value: 'INACTIVE'
	}, {
		label:'DENIED',
		value: 'DENIED'
	}, {
		label:'REMOVED',
		value: 'REMOVED'
	}, {
		label:'TEMPORARY',
		value: 'TEMPORARY'
	}];

export default (isMobile) => {
	return isMobile ? [{ label:'ALL', value: 'ALL' }, ...Links] : [{ label:'ALL VOTERS', value: 'ALL' }, ...Links]
}
