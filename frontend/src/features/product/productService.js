import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/products';

const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  createProduct: async (product) => {
    try {
      const response = await axios.post(BASE_URL, product);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (id, product) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, product);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default productService;
