// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null;
const initialState = {
  token: token,
  userInfo: {},
  projectInfo: {},
  loading: false,
  error: null,
  isHamburgerOpen: false,
  isMobileView: false,
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
    getHamburgerRequest(state, action) {
      state.isHamburgerOpen= action.payload;
    },
    getMobileRequest(state, action) {
      state.isMobileView = action.payload;
    }
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure, getProjectInfoRequest, getProjectInfoSuccess, getProjectInfoFailure, getHamburgerRequest, getMobileRequest } =
  userSlice.actions;
export default userSlice.reducer;
