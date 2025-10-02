import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  getPostDetail,
  getUserPost,
  updatePost,
  deletePost,
} from "./postActions";

const initialState = {
  loading: false,
  isAuthChecked: false,
  postInfo: [],
  postDetail: null,
  allPosts: [],
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

      // Get user Posts
      .addCase(getUserPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "Fetching all Posts...";
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Ensure posts are ordered newest-first. Backend may return oldest-first.
        const post = action.payload.posts || [];
        state.postInfo = Array.isArray(post)
          ? post
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt || b.created_at) -
                new Date(a.createdAt || a.created_at)
            )
          : [];
        state.message = action.payload.message;
      })
      .addCase(getUserPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Get all Posts
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
        state.allPosts = Array.isArray(posts)
          ? posts
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt || b.created_at) -
                new Date(a.createdAt || a.created_at)
            )
          : [];
        state.message = action.payload.message;
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // You can add more cases for other thunks like getPostDetail
      .addCase(getPostDetail.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.message = "Fetching Post Details...";
      })
      .addCase(getPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const post = action.payload.post || {};
        if (post._id && !post.id) post.id = post._id;
        state.postDetail = post;
        state.message = action.payload.message;
      })
      .addCase(getPostDetail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // You can add more cases for updatePost
      .addCase(updatePost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.message = "Updating Post...";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedPost = action.payload.post || {};
        if (updatedPost._id && !updatedPost.id)
          updatedPost.id = updatedPost._id;
        // Update post in postInfo array
        if (Array.isArray(state.postInfo)) {
          state.postInfo = state.postInfo.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
        }
        // Update postDetail if it matches the updated post
        if (state.postDetail && state.postDetail.id === updatedPost.id) {
          state.postDetail = updatedPost;
        }
        state.message = action.payload.message;
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // You can add more cases for deletePost
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.message = "Deleting Post...";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedPostId = action.payload.postId;
        // Remove post from postInfo array
        if (Array.isArray(state.postInfo)) {
          state.postInfo = state.postInfo.filter(
            (post) => post.id !== deletedPostId
          );
        }
        // Clear postDetail if it matches the deleted post
        if (state.postDetail && state.postDetail.id === deletedPostId) {
          state.postDetail = null;
        }
        state.message = action.payload.message;
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default postSlice.reducer;
