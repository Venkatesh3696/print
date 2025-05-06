import API from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  // showLoginPopup: false,
  // showRegisterPopup: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    try {
      const response = await API.post("/api/users/register", formData);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  try {
    const response = await API.post("/api/users/login", formData);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/users/check-auth");

      console.log("checking auth ==>>> ", data);
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Authentication failed",
        status: error.response?.status,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.isAuthenticated = false), (state.user = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })

      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.status === 401 || !action.payload?.user) {
          state.isAuthenticated = false;
          state.user = null;
        } else {
          console.log("login successful", action.payload);
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })

      // Handle checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === 401) {
          state.isAuthenticated = false;
          state.user = action?.payload?.user;
          console.log("fulfilled check auth", action.payload.response);
        } else {
          state.isAuthenticated = true;
          console.log(action.payload);
          state.user = action.payload.user;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log("rejected ==>> ", action.payload);
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
