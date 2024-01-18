import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
} from '../constants/userConstants';
import { loginUser, registerUser } from '../services/userServices';

export const login = (params: any) => async (dispatch: any) => {
  try {
    const { email, password } = params;

    dispatch({ type: USER_LOGIN_REQUEST });

    const { payload } = await loginUser({ email, password });

    dispatch({ type: USER_LOGIN_SUCCESS, payload });

    localStorage.setItem('userInfo', JSON.stringify(payload));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error,
    });
  }
};

export const logout = () => async (dispatch: any) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const register = (params: any) => async (dispatch: any) => {
  try {
    const { name, email, password } = params;

    dispatch({ type: USER_REGISTER_REQUEST });

    const { payload } = await registerUser({ name, email, password });

    dispatch({ type: USER_REGISTER_SUCCESS, payload });
    dispatch({ type: USER_LOGIN_SUCCESS, payload });

    localStorage.setItem('userInfo', JSON.stringify(payload));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: error,
    });
  }
};
