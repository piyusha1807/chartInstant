import axios from '../../utils/axios';

export function loginUser(params: any) {
  return axios.postRequest('/api/user/login', {
    ...params,
  });
}

export function registerUser(params: any) {
    return axios.postRequest('/api/user/register', {
      ...params,
    });
}
