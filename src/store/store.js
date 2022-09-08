import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import postsSlice from "./posts-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    posts: postsSlice,
  },
});

export default store;
