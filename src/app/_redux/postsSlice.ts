import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../interfaces";

interface PostsState {
  loading: boolean;
  posts: Post[];
  post: Post | null;
  error: string | null;
}

const initialState: PostsState = {
  loading: false,
  posts: [],
  post: null,
  error: null,
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetch(`https://linked-posts.routemisr.com/posts?limit=50`, {
    method: 'GET',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  console.log(data.posts);
  return data.posts;
});

export const getPost = createAsyncThunk('posts/getPost', async (postId: string) => {
  const response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`, {
    method: 'GET',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  console.log(data.post);
  return data.post;
});

export const getUserPosts = createAsyncThunk('posts/getUserPosts', async (userId: string) => {
  const response = await fetch(`https://linked-posts.routemisr.com/users/${userId}/posts?`, {
    method: 'GET',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  console.log(data.posts);
  return data.posts;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: string) => {
  const response = await fetch(`https://linked-posts.routemisr.com/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  console.log(data.post);
  return data.post;
});

export const deletePostComment = createAsyncThunk('posts/deletePostComment', async (commentId: string) => {
  const response = await fetch(`https://linked-posts.routemisr.com/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'token': `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  return data.comment;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch posts";
    });

    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });

    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch post";
    });

    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user posts";
    });

    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(post => post._id !== action.payload._id);
      if (state.post?._id === action.payload._id) {
        state.post = null;
      }
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete post";
    });

    builder.addCase(deletePostComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePostComment.fulfilled, (state, action) => {
      state.loading = false;
      if (state.post) {
        state.post.comments = state.post.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      }
    });

    builder.addCase(deletePostComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete comment";
    });
  },
});

export const postsReducers = postSlice.reducer;