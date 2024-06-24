// src/features/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const userData = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    userInfo: userData,
  },
  reducers: {
    getUserDataStart(state) {
      state.loading = true;
    },
    getUserDataSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    getUserDataError(state) {
      state.loading = false;
    },
    resetUser(state) {
      state.userInfo = {};
    },
  },
});

export const {
  getUserDataStart,
  getUserDataSuccess,
  getUserDataError,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
