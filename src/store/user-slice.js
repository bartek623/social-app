import { createSlice } from "@reduxjs/toolkit";

const initState = {
  uid: "",
  email: "",
  username: "",
  token: "",
  friends: [],
  notifications: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      const { uid, email, username, friends, notifications } = action.payload;
      state.uid = uid;
      state.email = email;
      state.username = username;
      state.friends = friends;
      state.notifications = Object.values(notifications).reverse();
      // state = { ...state, uid, email, username, friends };
    },
    logout: (state) => {
      state.uid = "";
      state.email = "";
      state.username = "";
      state.token = "";
      state.friends = [];
      state.notifications = [];
      localStorage.removeItem("tokenInfo");
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    updateFriendsList: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
