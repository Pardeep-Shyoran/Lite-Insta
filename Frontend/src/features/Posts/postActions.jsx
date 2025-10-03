import axios from '../../api/axiosconfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch all posts for any logged-in user
export const getUserPost = createAsyncThunk(
    'post/getUserPost',
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

// Thunk to get all posts
export const getAllPosts = createAsyncThunk(
    'post/getAllPosts',
    async (userId, { rejectWithValue }) => {
        try {
            const config = { withCredentials: true };
            const { data } = await axios.get(`/api/posts/all`, config);
            // console.log(`Fetched all posts`, data);
            return data; // expected { message, posts }
        } catch (err) {
            console.error(`Error fetching posts for user ${userId}:`, err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Thunk to get Post Detail by postId
export const getPostDetail = createAsyncThunk(
    'post/getPostDetail',
    async (postId, { rejectWithValue }) => {
        try {
            const config = { withCredentials: true };
            const { data } = await axios.get(`/api/posts/${postId}`, config);
            // console.log(`Fetched post detail for post ${postId}`, data);
            return data; // expected { message, post }
        } catch (err) {
            console.error(`Error fetching post detail for post ${postId}:`, err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// You can add more thunks for updatePost
export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({ postId, updateData }, { rejectWithValue }) => {
        try {
            const config = { withCredentials: true };
            const { data } = await axios.patch(`/api/posts/${postId}`, updateData, config);
            return data; // expected { message, post }
        } catch (err) {
            console.error(`Error updating post ${postId}:`, err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// You can add more thunks for deletePost
export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, { rejectWithValue }) => {
        try {
            const config = { withCredentials: true };
            const { data } = await axios.delete(`/api/posts/${postId}`, config);
            return data; // expected { message }
        } catch (err) {
            console.error(`Error deleting post ${postId}:`, err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);