import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/analytics";

export const fetchAnalyticsSummary = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summary`, {
      params: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw error;
  }
};
