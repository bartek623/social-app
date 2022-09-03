import { congigureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui-slice";

const store = congigureStore({
  reducers: {
    ui: uiSlice,
  },
});

export default store;
