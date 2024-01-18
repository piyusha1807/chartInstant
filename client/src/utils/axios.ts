import Axios from '../utils/http-utils';

export const API_ENDPOINT = process.env.REACT_APP_BACKEND_URL;

const AxiosClass: any = Axios;
const AxiosInstance = new AxiosClass(API_ENDPOINT);

export default AxiosInstance;
