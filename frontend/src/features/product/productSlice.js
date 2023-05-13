import { createSlice } from '@reduxjs/toolkit';
import productService from '../../features/product/productService';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductStart: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    },
    createProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductStart: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductStart: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const products = await productService.getAllProducts();
    dispatch(getProductsSuccess(products));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

export const addProduct = (product) => async (dispatch) => {
  dispatch(createProductStart());
  try {
    const newProduct = await productService.createProduct(product);
    dispatch(createProductSuccess(newProduct));
  } catch (error) {
    dispatch(createProductFailure(error.message));
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  dispatch(updateProductStart());
  try {
    const updatedProduct = await productService.updateProduct(id, product);
    dispatch(updateProductSuccess(updatedProduct));
  } catch (error) {
    dispatch(updateProductFailure(error.message));
  }
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch(deleteProductStart());
  try {
    await productService.deleteProduct(id);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure(error.message));
  }
};

export default productSlice.reducer;
