import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "headerSlice",
  initialState: {
    isCartOpen: false,
    searchText: "",
  },

  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openCart, closeCart } = dialogSlice.actions;
export default dialogSlice.reducer;
