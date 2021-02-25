import axios from 'axios';
import { URL_BACKEND } from './utils/constants';

const api = axios.create({ baseURL: `${URL_BACKEND}`, timeout: 1 * 60 * 1000 });

export default api;