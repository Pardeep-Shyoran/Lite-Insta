import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchCurrentUser, logoutUser, updateProfile } from "./authActions";


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
      
      // Logout User
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userInfo = null;
        state.success = false;
        state.message = action.payload.message || "Logged out successfully";
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.error = payload || "Failed to logout";
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "Updating profile...";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const user = action.payload.user || {};
        if (user._id && !user.id) user.id = user._id;
        state.userInfo = user;
        state.message = action.payload.message || "Profile updated successfully";
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to update profile";
      });
  },
});

export default authSlice.reducer;
