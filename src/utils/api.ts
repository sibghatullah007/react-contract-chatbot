import axios from 'axios';

const API_BASE_URL = 'https://mvp3-1.onrender.com';
// const API_BASE_URL = 'https://mvpfeb25.onrender.com';

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

export const chatWithContract = async (contractId: string, question: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      contract_id: contractId,
      question,
    });
    return response.data;
  } catch (error) {
    console.error('Error querying contract:', error);
    throw error;
  }
};

export const getContracts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contracts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
};
