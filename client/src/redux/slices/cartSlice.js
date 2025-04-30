import API from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
};

export const getCart = createAsyncThunk("cart/getcart", async () => {
  try {
    const { data } = await API.get("/api/cart");

    return data;
  } catch (error) {
    return error.response?.data;
  }
});

export const addToCart = createAsyncThunk("cart/add", async (formData) => {
  try {
    const response = await API.post("/api/cart", formData);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
});

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (formData) => {
    try {
      const response = await API.post("/api/cart", formData);
      return response.data;
    } catch (error) {
      return error.response?.data;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("in slice", action.payload[0].items);
        state.cartItems = action.payload[0].items;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = true;
        state.cartItems = [];
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { setUser } = cartSlice.actions;

export default cartSlice.reducer;
