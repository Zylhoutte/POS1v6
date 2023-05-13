import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    addToCart: (state, action) => {
      const { _id, name, price, quantity: availableQuantity } = action.payload;
      const existingProduct = state.cartItems.find((product) => product._id === _id);
    
      if (existingProduct) {
        const totalQuantity = existingProduct.quantity + 1;
        if (totalQuantity <= Math.min(availableQuantity)) {
          existingProduct.quantity = totalQuantity;
        }
      } else {
        state.cartItems.push({ _id, name, price, quantity: 1 });
      }
    
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    
    
    increment: (state, action) => {
      const index = state.cartItems.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    decrement: (state, action) => {
      const index = state.cartItems.findIndex((product) => product._id === action.payload._id);
      if (index !== -1 && state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    updateCart: (state, action) => {
      const index = state.cartItems.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.cartItems[index].quantity = action.payload.quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => product._id !== action.payload._id);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.product._id === productId
      );
      if (index !== -1) {
        const item = state.cartItems[index];
        // Increase or decrease product quantity by the difference in quantity
        item.product.quantity += item.quantity - quantity;
        // Update cart item quantity
        item.quantity = quantity;
      }
    },
    
  },
});

export const {
  showLoading,
  hideLoading,
  addToCart,
  increment,
  decrement,
  updateCart,
  deleteFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
