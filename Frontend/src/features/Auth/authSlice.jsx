import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";


const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  success: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setCredentials: (state, action) => {
    //   state.userInfo = action.payload;
    // },
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
        state.userInfo = action.payload.user;
        state.message = action.payload.message;
        
      })
      .addCase(registerUser.rejected, (state, {payload}) => {
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
        state.userInfo = action.payload.user;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })

    
  },
});

export default authSlice.reducer;