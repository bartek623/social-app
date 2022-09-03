import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "light",
  },
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
