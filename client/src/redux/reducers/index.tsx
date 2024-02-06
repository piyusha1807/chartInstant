import { combineReducers } from 'redux';
import { notificationReducer } from './notificationReducers';
import { userLoginReducer, userRegisterReducer } from './userReducers';
import { uploadReducer } from './dashboardReducers';

export default combineReducers({
  notification: notificationReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  uploadReducer,
});
