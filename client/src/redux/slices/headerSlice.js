import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "headerSlice",
  initialState: {
    isCartOpen: false,
    isSearchOpen: false,
    searchText: "",
  },

  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
      state.isSearchOpen = false;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    openSearch: (state) => {
      state.isSearchOpen = true;
      state.isCartOpen = false;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
  },
});

export const { openCart, closeCart, openSearch, closeSearch } =
  dialogSlice.actions;
export default dialogSlice.reducer;
