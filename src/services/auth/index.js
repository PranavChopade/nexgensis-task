import api from '../../api/apiInstance.js';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};
