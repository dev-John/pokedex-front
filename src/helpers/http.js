import axios from 'axios';

const codes = [413, 401, 400, 403];

const validateStatus = (status) => (status >= 200 && status < 300) || codes.includes(status);

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  validateStatus,
  withCredentials: true,
});
