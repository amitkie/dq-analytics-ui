// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const token = JSON.parse(localStorage.getItem('userInfo'));
const initialState = {
  token: token,
  userInfo: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.userInfo = {};
      state.loading = false;
      state.error = null;

    },
    getUserInfoRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getUserInfoSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
    },
    getUserInfoFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure } =
  userSlice.actions;
export default userSlice.reducer;
