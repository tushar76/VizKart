import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/analytics";

export const fetchAnalyticsSummary = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};
