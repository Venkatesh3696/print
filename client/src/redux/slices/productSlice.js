import API from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productsList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchallfilteredproducts",
  async (filters) => {
    console.log(filters);
    try {
      const params = {};
      if (filters.keyword) params.search = filters.keyword;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      console.log("in products slice", params);

      const { data } = await API.get("/api/products", { params });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    try {
      const result = await API.get(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shopingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action?.payload?.products;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        console.log("rejedced");
        state.isLoading = false;
        state.productsList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
