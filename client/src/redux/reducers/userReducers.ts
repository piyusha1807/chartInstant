import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
} from '../constants/userConstants';

const loginInitialState = {
  userInfo: {},
  loading: false,
  error: null,
};

const registerInitialState = {
  userInfo: {},
  loading: false,
  error: null,
};

export const userLoginReducer = (state = loginInitialState, { type, payload }: any) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload,
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        userInfo: payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = registerInitialState, { type, payload }: any) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: payload,
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        userInfo: payload,
      };
    default:
      return state;
  }
};
