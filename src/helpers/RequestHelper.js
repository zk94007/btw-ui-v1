import axios from 'axios';
import History from '../utility/History';

import authStorage from '../storage/AuthStorage';
import { isTokenValid } from '../helpers/TokenHelper';
import routes from '../constants/Routes';
import environment from '../constants/Env';

export function deleteAsync({ url, data = {}, headers = {}, includeToken = true, failRedirect = true }) {
    const requestData = {
        url,
        data,
        method: 'DELETE',
        headers: mergeHeaders(headers)
    };
    return makeRequest(requestData, includeToken, failRedirect);
}

export function patchAsync({ url, data = {}, headers = {}, includeToken = true, failRedirect = true }) {
    const requestData = {
        url,
        data,
        method: 'PATCH',
        headers: mergeHeaders(headers)
    };
    return makeRequest(requestData, includeToken, failRedirect);
}

export function postAsync({ url, data = {}, headers = {}, includeToken = true, failRedirect = true }) {
    const requestData = {
        url,
        data,
        method: 'POST',
        headers: mergeHeaders(headers)
    };
    return makeRequest(requestData, includeToken, failRedirect);
}

export function getAsync({ url, params = {}, headers = {}, includeToken = true, failRedirect = true }) {
    const requestData = {
        url,
        params,
        method: 'GET',
        headers: mergeHeaders(headers),
    };
    return makeRequest(requestData, includeToken, failRedirect);
}

export function uploadFileAsync({ url, file, tag='file', headers = {}, includeToken = true, failRedirect = true }) {
    let formData = new FormData()
    formData.append(tag, file)

    const requestData = {
        url,
        data: formData,
        method: 'POST',
        headers: {},
    };

    return makeRequest(requestData, includeToken, failRedirect);
}

function makeRequest(requestData, includeToken, failRedirect) {
    if (includeToken) {
        const { token, ...restInfo} = authStorage.getTokenInfo();
        if (authStorage.isAuthenticated() && !isTokenValid(restInfo)) {
            toErrorPage();
            return Promise.reject();
        }
        requestData.headers['Authorization'] = `Bearer ${token}`;
    }

    return axios(requestData)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(response => {
            // handle server down
            if (response.request) {
                return Promise.reject({ data: { message: 'No response returned from the server' }});
            }
            if (process.env.NODE_ENV !== environment.test && failRedirect) {
                toErrorPage();
            }
            return Promise.reject(response.data);
        });
}

function mergeHeaders(headers = {}) {
    let defaultHeader =  { "Content-Type": "application/json" };
    return Object.assign({}, defaultHeader, headers);
}


function toErrorPage() {
    History.push(routes.pageDown);
}