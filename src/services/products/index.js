import api from '../../api/apiInstance';

export const fetchProducts = async (limit = 10, skip = 0) => {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const searchProducts = async (query, limit = 10, skip = 0, signal) => {
  const response = await api.get(
    `/products/search?q=${query}&limit=${limit}&skip=${skip}`,
    { signal },
  );
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (
  category,
  limit = 10,
  skip = 0,
) => {
  const response = await api.get(
    `/products/category/${category}?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};
export const sortProducts = async (sortBy, order) => {
  const response = await api.get(`/products?sortBy=${sortBy}&order=${order}`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post('/products/add', productData);
  return response.data;
};
