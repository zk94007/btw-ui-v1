import qs from 'qs';
import moment from 'moment';

import { parseJwt } from '../../../helpers/TokenHelper';


export const getQueryObj = (hash) => {
    const params = qs.parse(hash);

    return {
        token: params['#access_token'],
        idToken: params['id_token']
            ? parseJwt(params['id_token'])
            : null,
        expiresIn: parseInt(params['expires_in'], 10),
        startTime: moment().valueOf()
    };
};