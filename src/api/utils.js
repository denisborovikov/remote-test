import axios from 'axios';

export const BASE_URL = 'http://localhost:4000';
axios.defaults.baseURL = BASE_URL;

async function get(url, params) {
  const response = await axios.get(url, { params });
  return response.data;
}

async function post(url, data) {
  const response = await axios.post(url, data);
  return response.data;
}

async function patch(url, data) {
  const response = await axios.patch(url, data);
  return response.data;
}

export const http = {
  get,
  patch,
  post,
};
