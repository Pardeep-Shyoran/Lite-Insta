import { createSlice } from "@reduxjs/toolkit";
import { createPost, getAllPosts } from "./postActions";

const initialState = {
  loading: false,
  isAuthChecked: false,
  postInfo: [],
  error: null,
  success: false,
  message: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      setPost(state, action) {
          // ensure postInfo stays an array
          state.postInfo = action.payload || [];
      },
    },

    extraReducers: (builder) => {
        builder
        //  Create Post
        .addCase(createPost.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = "Creating your Post...";
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          const post = action.payload.post || {};
          if (post._id && !post.id) post.id = post._id;
          // add the created post to the beginning of the posts array
          if (Array.isArray(state.postInfo)) {
            state.postInfo = [post, ...state.postInfo.reverse()];
          } else {
            state.postInfo = [post.reverse()];
          }
          state.message = action.payload.message;
  
        })
        .addCase(createPost.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        })

        // Get All Posts
        .addCase(getAllPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = "Fetching all Posts...";
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          // Ensure posts are ordered newest-first. Backend may return oldest-first.
          const posts = action.payload.posts || [];
          state.postInfo = Array.isArray(posts)
            ? posts.slice().reverse().sort((a, b) => new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at))
            : [];
          state.message = action.payload.message;
        })
        .addCase(getAllPosts.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        })
    }
})

export default postSlice.reducer;