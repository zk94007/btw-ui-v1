import envConsts from '../constants/Env';

const env = process.env.REACT_APP_ENV || process.env.NODE_ENV;
let config = null;

switch (env) {
    case envConsts.prod: {
        config = require('./env/prod');
        break;
    }
    case envConsts.preprod: {
        config = require('./env/preprod');
        break;
    }
    case envConsts.staging: {
        config = require('./env/staging');
        break;
    }
    case envConsts.dev: {
        config = require('./env/dev');
        break;
    }
    default: {
        config = require('./env/dev');
    }
}

export default config.default;