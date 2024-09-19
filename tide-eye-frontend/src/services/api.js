// src/services/api.js
import axios from 'axios';

export const fetchTideData = async (harbor) => {
  try {
    const response = await axios.get(`/api/tides/${harbor}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tide data", error);
    throw error;
  }
};
