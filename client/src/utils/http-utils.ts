import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { errorNotification } from '../redux/actions/notificationActions';
import store from '../redux/store';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

class AxiosClass {
  Axios: AxiosInstance;

  constructor(baseURL: string) {
    this.Axios = axios.create({
      baseURL,
      timeout: 10000,
    });
    this.setUpInterceptors();
  }

  setUpInterceptors() {
    this.Axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        const errorData = error?.response?.data || error;
        const errorObj = {
          message: 'Operation failed. Please try again after some time.',
          ...errorData,
        };

        store.dispatch(errorNotification(errorObj.message));

        throw error;
      }
    );

    this.Axios.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        const { token } = JSON.parse(localStorage.getItem('userInfo') || '{}');
        request.headers.Authorization = `Bearer ${token}`;
        return request;
      },
      (error) => {
        throw error;
      }
    );
  }

  getRequest(url: string, headers: any = {}) {
    return this.Axios.get(url, {
      headers: { ...defaultHeaders, ...headers },
    }).then((response) => (response?.data ? response.data : response));
  }

  postRequest(url: string, data: any, headers: any = {}) {
    return this.Axios.post(url, data, {
      headers: { ...defaultHeaders, ...headers },
    }).then((response) => (response?.data ? response.data : response));
  }

  deleteRequest = (url: string, headers: any = {}) =>
    this.Axios.delete(url, {
      headers: { ...defaultHeaders, ...headers },
    }).then((response) => (response?.data ? response.data : response));

  deleteRequestWithPayload = (url: string, data?: any, headers: any = {}) =>
    this.Axios.delete(url, {
      data,
      headers: { ...defaultHeaders, ...headers },
    }).then((response) => (response?.data ? response.data : response));

  putRequest = (url: string, data: any = {}, headers: any = {}) =>
    this.Axios.put(url, data, {
      headers: { ...defaultHeaders, ...headers },
    }).then((response) => (response?.data ? response.data : response));

  patchRequest(url: string, data: any, headers: any = {}) {
    return this.Axios.patch(url, data, {
      headers: { ...defaultHeaders, ...headers },
    }).then((response) => (response?.data ? response.data : response));
  }
}

export default AxiosClass;
