import axios from "../../api/axiosconfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios instance already has baseURL set from env; avoid double-prefixing

export const registerUser = createAsyncThunk(
    'api/auth/register',
    async (user, {rejectWithValue}) => {
        try {
            // build FormData to match backend (multer expects file field named 'image')
            const { profilePic, username, password, fullName, email, confirmPassword } = user;

            const formData = new FormData();
            if (profilePic) {
                // react-hook-form file input usually provides FileList or File
                const file = profilePic instanceof File ? profilePic : (profilePic[0] || null);
                if (file) formData.append('image', file);
            }

            if (username) formData.append('username', username);
            if (password) formData.append('password', password);
            if (fullName) formData.append('fullName', fullName);
            if (email) formData.append('email', email);
            if (confirmPassword) formData.append('confirmPassword', confirmPassword);

            const config = {
                headers: {
                    // Let the browser set the proper Content-Type with boundary
                },
                withCredentials: true,
            }

            const { data } = await axios.post(`/api/auth/register`, formData, config);

            console.log(data);
            
            return data;

        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const loginUser = createAsyncThunk(
    'api/auth/login',
    async ({ username, password }, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                // allow cookies to be included in the response
                withCredentials: true,
            }

            const { data } = await axios.post(
                `/api/auth/login`,
                { username, password },
                config
            )

            // console.log(data);
            
            return data;
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(
    'api/auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const config = { withCredentials: true };
            const { data } = await axios.get(`/api/auth/user`, config);
            // console.log(data);
            
            // backend returns { message, user }
            return data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

// export const logoutUser = createAsyncThunk(
//     'api/auth/logout',
//     async (_, { rejectWithValue }) => {
//         try {
//             const config = { withCredentials: true };
//             const { data } = await axios.get(`/api/auth/logout`, config);
//             return data;
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// );