import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const citizenLogin = async (credentials) => {
  return axios.post(`${API_URL}/citizen/login`, credentials);
};

export const policeLogin = async (credentials) => {
  return axios.post(`${API_URL}/police/login`, credentials);
};