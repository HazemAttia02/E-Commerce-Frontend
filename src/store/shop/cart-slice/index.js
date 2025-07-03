import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

const REACT_APP_URL = "https://e-commerce-backend-dauf.onrender.com" || "http://localhost:5000";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${REACT_APP_URL}/api/shop/cart/add`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `${REACT_APP_URL}/api/shop/cart/get/${userId}`
    );

    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${REACT_APP_URL}/api/shop/cart/delete-one/${userId}/${productId}`
    );

    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${REACT_APP_URL}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

// Action to delete all items in the cart
export const deleteAllCartItems = createAsyncThunk(
  "cart/deleteAllCartItems",
  async (userId) => {
    const response = await axios.delete(
      `${REACT_APP_URL}/api/shop/cart/delete-all/${userId}`
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteAllCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data; // Assuming the response contains the updated cart
      })
      .addCase(deleteAllCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
