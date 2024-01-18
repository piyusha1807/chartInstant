import {
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_WARNING,
  NOTIFICATION_INFO,
} from '../constants/notificationConstants';

const initialState = {
  type: '',
  message: '',
  timeOut: 3000,
  showAlert: false,
};

export const notificationReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case NOTIFICATION_ERROR:
      return {
        ...state,
        type: 'error',
        message: payload,
        timeOut: 5000,
        showAlert: true,
      };
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        type: 'success',
        message: payload,
        timeOut: 3000,
        showAlert: true,
      };
    case NOTIFICATION_WARNING:
      return {
        ...state,
        type: 'warning',
        message: payload,
        timeOut: 3000,
        showAlert: true,
      };
    case NOTIFICATION_INFO:
      return {
        ...state,
        type: 'info',
        message: payload,
        timeOut: 3000,
        showAlert: true,
      };
    default:
      return state;
  }
};
