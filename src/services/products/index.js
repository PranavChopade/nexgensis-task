import api from '../../api/apiInstance';

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const searchProducts = async (query, signal) => {
  const response = await api.get(`/products/search?q=${query}`, { signal });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};
export const sortProducts = async (sortBy, order) => {
  const response = await api.get(`/products?sortBy=${sortBy}&order=${order}`);
  return response.data;
};
