import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../features/Auth/authSlice';
import postSlice from '../features/Posts/postSlice';


const store = configureStore({
    reducer: {
        authReducer: authSlice,
        postReducer: postSlice,
    },
})

export default store;