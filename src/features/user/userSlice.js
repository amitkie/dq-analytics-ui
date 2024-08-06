// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const token = JSON.parse(localStorage.getItem('userInfo'));
const initialState = {
  token: token,
  userInfo: {},
  projectInfo: {},
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
      console.log(state.token, "sshugugugugugugug");
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.userInfo = {};
      state.projectInfo = {};
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
    getProjectInfoRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getProjectInfoSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.projectInfo = action.payload;
    },
    getProjectInfoFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure, getProjectInfoRequest, getProjectInfoSuccess, getProjectInfoFailure } =
  userSlice.actions;
export default userSlice.reducer;
