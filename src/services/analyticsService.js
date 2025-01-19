import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/analytics";

export const fetchAnalyticsSummary = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/summary`);
    return data;
  } catch (error) {
    console.error("Error fetching analytics data:", {
      message: error.message,
      status: error.response?.status,
      details: error.response?.data,
    });
    throw new Error("Failed to fetch analytics data. Please try again later.");
  }
};
