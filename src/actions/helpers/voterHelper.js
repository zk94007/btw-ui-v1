import authStorage from '../../storage/AuthStorage';

export function getSource(source) {
    const findSocial = social => ({ type, name }) => type === 'social' && name === social;

    return {
        showVoterFile: !source || source.some(({ type }) => type === 'file' || type === 'elasticSearch'),
        twitter: source && source.some(findSocial('Twitter')),
        google: source && source.some(findSocial('Google'))
    };
}

export function getUserStateInfo() {
    const user = authStorage.getLoggedUser();
    const { district } = user;
    const parsedDistrict = district.split(':').reverse();

    return parsedDistrict.length > 1
        ? { state: parsedDistrict[1].split('/')[0], district: parsedDistrict[0] }
        : {}

}

export function isSameDistrict(voter) {
    const stateInfo = getUserStateInfo();
    const { details: {
            State,
            Congressional_District,
            state_cd  = '',
            cong_dist_abbrv = ''
        } = {},
        state = State || state_cd,
        congressionalDistrict = Congressional_District || cong_dist_abbrv
    } = voter;

    return stateInfo.state.toLowerCase() === state.toLowerCase()
        && parseInt(stateInfo.district) === parseInt(congressionalDistrict);
}