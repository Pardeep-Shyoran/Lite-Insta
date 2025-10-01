import axios from '../../api/axiosconfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch all posts. Returns the backend response object
export const getAllPosts = createAsyncThunk(
    'post/getAllPosts',
    async (_, { rejectWithValue }) => {
        try {
            const config = { withCredentials: true };
            const { data } = await axios.get('/api/posts', config);
            // console.log('Fetched posts data:', data);
            
            // backend returns { message, posts }
            return data;
        } catch (err) {
            console.error('Error fetching posts:', err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Thunk to create a post. Accepts either a FormData instance or a plain object { image: File, caption }
export const createPost = createAsyncThunk(
    'post/createPost',
    async (postPayload, { rejectWithValue }) => {
        try {

                const formdata = new FormData();

                if (postPayload && typeof postPayload.append === 'function') {
                    const body = postPayload;
                    const config = {
                        headers: {},
                        withCredentials: true,
                    };
                    const { data } = await axios.post('/api/posts', body, config);
                    return data;
                }

                const { image } = postPayload || {};

                if (image && image[0]) {
                    formdata.append('image', image[0]);
                } else if (image) {
                    formdata.append('image', image);
                }

            const body = formdata;

            const config = {
                headers: {},
                withCredentials: true,
            };

            const { data } = await axios.post('/api/posts', body, config);
            return data; // expected { message, post }
        } catch (err) {
            console.error('Error creating post:', err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);