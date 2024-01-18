import {
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_WARNING,
  NOTIFICATION_INFO,
} from '../constants/notificationConstants';

export function errorNotification(payload: any) {
  return {
    type: NOTIFICATION_ERROR,
    payload,
  };
}

export function successNotification(payload: any) {
  return {
    type: NOTIFICATION_SUCCESS,
    payload,
  };
}

export function warningNotification(payload: any) {
  return {
    type: NOTIFICATION_WARNING,
    payload,
  };
}

export function infoNotification(payload: any) {
  return {
    type: NOTIFICATION_INFO,
    payload,
  };
}
