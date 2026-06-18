import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitEnquiry = async (data) => {
  try {
    const response = await API.post('/enquiry', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Something went wrong. Please try again.');
  }
};

export default API;
