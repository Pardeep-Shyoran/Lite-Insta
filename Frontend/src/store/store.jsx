import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../features/Auth/authSlice';


const store = configureStore({
    reducer: {
        authReducer: authSlice,

    },
})

export default store;