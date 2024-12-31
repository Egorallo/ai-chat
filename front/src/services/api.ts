import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export const sendMsg = async (message: string) => {
  try {
    const response = await apiClient.post('/chat', { message });
    return response.data;
  } catch (error) {
    throw error;
  }
};
