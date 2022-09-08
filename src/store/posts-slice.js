import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postsSort: "newest",
    tags: [],
  },
  reducers: {
    loadPosts: (state, action) => {
      let posts;
      if (action.payload.replace) {
        posts = action.payload.posts;
      } else {
        posts = [...action.payload.posts, ...state.posts];
      }
      const tags = posts.reduce(
        (accTags, post) => (accTags = [...accTags, ...(post.tags || [])]),
        []
      );
      const tagsUnique = new Set(tags);

      state.posts = posts;
      state.tags = [...tagsUnique];
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.postId !== action.payload
      );
    },
    sortPosts: (state, action) => {
      state.postsSort = action.payload;
    },
    updateComments: (state, action) => {
      const post = state.posts.find(
        (post) => post.postId === action.payload.postId
      );
      post.comments = action.payload.comments;
    },
    updateLikes: (state, action) => {
      const post = state.posts.find(
        (post) => post.postId === action.payload.postId
      );
      post.likedBy = action.payload.likes;
    },
  },
});

export default postsSlice.reducer;

export const postsActions = postsSlice.actions;
