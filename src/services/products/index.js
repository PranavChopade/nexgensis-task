import api from '../../api/apiInstance';

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};
