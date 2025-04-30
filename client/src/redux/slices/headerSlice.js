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
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { openCart, closeCart, setSearchText } = dialogSlice.actions;
export default dialogSlice.reducer;
