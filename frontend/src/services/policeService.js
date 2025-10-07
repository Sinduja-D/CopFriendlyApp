import axios from 'axios';

const API_URL = 'http://localhost:3001/api/police';

export const getComplaints = async () => {
  return axios.get(`${API_URL}/complaints`);
};

export const updateComplaint = async (id, status) => {
  return axios.put(`${API_URL}/complaints/${id}`, { status });
};

export const getSOSAlerts = async () => {
  return axios.get(`${API_URL}/sos`);
};

export const updateCaseStatus = async (id, status) => {
  return axios.put(`${API_URL}/cases/${id}`, { status });
};

export const getAnalytics = async () => {
  return axios.get(`${API_URL}/analytics`);
};