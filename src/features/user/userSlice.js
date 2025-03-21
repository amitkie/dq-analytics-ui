// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialActiveMenu = localStorage.getItem('activeMenu') || '';

const userData = localStorage.getItem('userData');
let userId = null;

if (userData && userData !== "undefined") {
  try {
    userId = JSON.parse(userData)?.userId;
  } catch (error) {
    console.error("Invalid JSON in userData:", error);
    userId = null;
  }
}

const initialState = {
  userId: userId,
  userData: {},
  userInfo: {},
  projectInfo: {},
  loading: false,
  error: null,
  isHamburgerOpen: false,
  isMobileView: false,
  activeMenu: initialActiveMenu,
  recentlyUsedProjectId:localStorage.getItem('recentProjectId') || null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUserLoggedInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    checkUserLoggedInSuccess(state, action) {
      state.loading = false;
      state.userData = action.payload;
    },
    checkUserLoggedInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userId = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userId = null;
      state.userInfo = {};
      state.userData = {};
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
    getRecentProjectRequest(state, action) {
      state.recentlyUsedProjectId = action.payload;
      localStorage.setItem('recentProjectId', action.payload);
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
      // Also update localStorage when Redux state is updated
      localStorage.setItem('activeMenu', action.payload);
    },
  },
});

export const { checkUserLoggedInRequest, checkUserLoggedInSuccess, checkUserLoggedInFailure, loginRequest, loginSuccess, loginFailure, logout, getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure, getProjectInfoRequest, getProjectInfoSuccess, getProjectInfoFailure, getHamburgerRequest, getMobileRequest, getRecentProjectRequest, setActiveMenu } =
  userSlice.actions;
export default userSlice.reducer;
