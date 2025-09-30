import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchCurrentUser } from "./authActions";


const initialState = {
  loading: false,
  isAuthChecked: false,
  userInfo: null,
  error: null,
  success: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload || {};
    },
  },

  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Creating your Account...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const user = action.payload.user || {};
        if (user._id && !user.id) user.id = user._id;
        state.userInfo = user;
        state.message = action.payload.message;

      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Logging in your Account...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload.user || {};
        if (user._id && !user.id) user.id = user._id;
        state.userInfo = user;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Fetch current user (session check)
      .addCase(fetchCurrentUser.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const user = action.payload.user || {};
        if (user._id && !user.id) user.id = user._id;
        state.userInfo = user;
        state.success = !!user && Object.keys(user).length > 0;
        state.message = action.payload.message || null;
        state.isAuthChecked = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.userInfo = null;
        state.error = payload || null;
        state.isAuthChecked = true;
      })
      
  },
});

export default authSlice.reducer;
