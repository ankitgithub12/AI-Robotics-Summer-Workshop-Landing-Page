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

// Admin Auth
export const adminLogin = async (email, password) => {
  try {
    const response = await API.post('/admin/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Authentication failed. Please check your credentials.');
  }
};

// Manage Enquiries
export const getEnquiries = async (token) => {
  try {
    const response = await API.get('/admin/enquiries', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to retrieve enquiries.');
  }
};

export const updateEnquiry = async (id, data, token) => {
  try {
    const response = await API.put(`/admin/enquiries/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to update enquiry.');
  }
};

export const deleteEnquiry = async (id, token) => {
  try {
    const response = await API.delete(`/admin/enquiries/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to delete enquiry.');
  }
};

// Student User Auth
export const userSignup = async (userData) => {
  try {
    const response = await API.post('/user/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Signup failed. Please try again.');
  }
};

export const userLogin = async (email, password) => {
  try {
    const response = await API.post('/user/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Authentication failed. Please check your credentials.');
  }
};

// Student Profile & Enquiry Linkage
export const getUserProfile = async (token) => {
  try {
    const response = await API.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to retrieve user profile.');
  }
};

export default API;
