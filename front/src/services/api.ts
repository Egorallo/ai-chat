import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export const sendMsg = async (message: string) => {
  try {
    console.log('Sending message to AI:', message);
    const response = await apiClient.post('/chat', { message });
    console.log('Response from AI:', response.data);
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error sending message to AI:', error);
    throw error;
  }
};
