import axios from "axios";
const API_URL = "http://192.168.29.6:8000"; // Replace with your backend URL

// Save pages to the backend
export const savePages = async (pages) => {
  try {
    const response = await axios.post(`${API_URL}/testing/`, {data:pages});
    return response.data;
  } catch (error) {
    console.error("Error saving pages:", error);
  }
};

// Fetch saved pages from the backend
export const fetchPages = async () => {
  try {
    const response = await axios.get(`${API_URL}/testing/`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
};
