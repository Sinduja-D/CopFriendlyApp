import axios from 'axios';

const API_URL = 'http://localhost:3001/api/citizen';

export const reportCrime = async (crimeData) => {
  return axios.post(`${API_URL}/report`, crimeData);
};

export const sendSOS = async (location) => {
  return axios.post(`${API_URL}/sos`, { location });
};

export const getComplaints = async (citizenId) => {
  return axios.get(`${API_URL}/complaints?citizenId=${citizenId}`);
};

export const updateProfile = async (citizenId, profileData) => {
  return axios.put(`${API_URL}/profile/${citizenId}`, profileData);
};