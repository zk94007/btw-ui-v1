import qs from 'qs';

export function getUrlParam(props, name) {
    const params = parseParams(props)
    return params[name];
}

export function getUrlParams(props) {
    return parseParams(props);
}

function parseParams(props) {
    const { search } = props.location || {};
    return qs.parse(search);
}