import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjY2ZGFjNzdlYzI0ZWVlNjBmMmY5ZTFjYyIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ0d29AZ21haWwuY29tIiwidXNlck5hbWUiOiJ0d28iLCJpYXQiOjE3MjkwMTY4NDEsImV4cCI6MTcyOTAyMDQ0MX0.Aq_wiM8FfqhZDk4aFjPru9Fil1_dUkLgpejhTymqdjY"

export const registerUser = createAsyncThunk(
  "/auth/register",

  //http://localhost:5000/api/auth/register
  async (formData) => {
    const response = await axios.post(
      "https://server-app-six.vercel.app/api/auth/register",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  //http://localhost:5000/api/auth/login
  async (formData) => {
    const response = await axios.post(
      "https://server-app-six.vercel.app/api/auth/login",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  //http://localhost:5000/api/auth/logout
  async () => {
    const response = await axios.post(
      "https://server-app-six.vercel.app/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  //http://localhost:5000/api/auth/check-auth
  async () => {
    const response = await axios.get(
      "https://server-app-six.vercel.app/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

//Default export and named export
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
