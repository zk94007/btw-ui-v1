import votersReducer from './VotersReducer';
import appReducer from './AppReducer';
import taskListReducer from './TasksReducer';
import userReducer from './UserReducer';
import passwordRequestReducer from './PasswordRequestReducer';
import errorReducer from './ErrorReducer';
import districtReducer from './DistrictReducer';

//this is where you insert your reducers into the store
export default {
    app: appReducer,
    voterList: votersReducer,
    taskList: taskListReducer,
    user: userReducer,
    request: passwordRequestReducer,
    districtList: districtReducer,
    error: errorReducer
}