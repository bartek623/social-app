import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: "",
    email: "",
    username: "",
    token: "",
  },
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.uid = "";
      state.email = "";
      state.username = "";
      state.token = "";
      localStorage.removeItem("tokenInfo");
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
