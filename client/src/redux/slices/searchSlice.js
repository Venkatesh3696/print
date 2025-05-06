import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
});

export const { setKeyword } = searchSlice.actions;

export default searchSlice.reducer;
