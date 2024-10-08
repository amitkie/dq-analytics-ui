// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialActiveMenu = localStorage.getItem('activeMenu') || '';

const userInfo = localStorage.getItem('userInfo');
let token = null;

if (userInfo && userInfo !== "undefined") {
  try {
    token = JSON.parse(userInfo);
  } catch (error) {
    console.error("Invalid JSON in userInfo:", error);
    token = null;
  }
}

const initialState = {
  token: token,
  userInfo: {},
  projectInfo: {},
  loading: false,
  error: null,
  isHamburgerOpen: false,
  isMobileView: false,
  activeMenu: initialActiveMenu,
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
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
      // Also update localStorage when Redux state is updated
      localStorage.setItem('activeMenu', action.payload);
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure, getProjectInfoRequest, getProjectInfoSuccess, getProjectInfoFailure, getHamburgerRequest, getMobileRequest, setActiveMenu } =
  userSlice.actions;
export default userSlice.reducer;
