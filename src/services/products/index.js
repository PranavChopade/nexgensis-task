import api from '../../api/apiInstance';

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const searchProducts = async (query, signal) => {
  const response = await api.get(`/products/search?q=${query}`, { signal });
  return response.data;
};
