import API from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
};

export const getCart = createAsyncThunk("cart/getcart", async () => {
  try {
    const { data } = await API.get("/api/cart");

    return data[0];
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

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (formData) => {
    try {
      const response = await API.put("/api/cart", formData);
      return response.data;
    } catch (error) {
      return error.response?.data;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (formData) => {
    const { productId } = formData;
    console.log("in rem crt", productId);
    console.log({ productId });
    try {
      const { data } = await API.delete(`/api/cart/${productId}`);
      console.log(data);
      return data;
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
        state.cartItems = action?.payload?.items;
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
        state.cartItems = action?.payload?.items;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action?.payload?.cart?.items;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action?.payload?.cartItems?.items;
      })
      .addCase(updateQuantity.rejected, (state) => {
        state.loading = false;
        state.cartItems = [];
      });
  },
});

export const selectCartTotal = (state) =>
  state?.cart?.cartItems?.product?.reduce((total, item) => {
    console.log(total, item);

    return total + item.price * item.quantity, 0;
  });

export const { setUser } = cartSlice.actions;

export default cartSlice.reducer;
