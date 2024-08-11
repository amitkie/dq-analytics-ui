// src/features/user/userSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserAndPaymentInfo, login } from '../../services/userService'; // Ensure this path is correct
import { loginRequest, loginSuccess, loginFailure, getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure, getProjectInfoSuccess, getProjectInfoFailure, getProjectInfoRequest } from './userSlice';
import { getProjectDetailsByUserId } from '../../services/projectService';
// import { setAlert } from '../alert/alertSlice';

function* handleLogin(action) {
  try {
    const { email, password } = action?.payload;
    const response = yield call(() => login({email, password}));
  
    yield put(loginSuccess(response));
    // yield put(setAlert({ type: 'success', message: 'Login successful!' }));
  } catch (error) {
    yield put(loginFailure(error.message));
    // yield put(setAlert({ type: 'error', message: 'Login failed!' }));
  }
}
function* getUserInfo(action) {
  try {
  // console.log(action);
  const  id  = action.payload;
  const response  = yield call(() => getUserAndPaymentInfo(id))
    yield put(getUserInfoSuccess(response));
  } catch (error) {
    // console.log(error);
    yield put(getUserInfoFailure(error.message));
    // yield put(setAlert({ type: 'error', message: 'Failed to fetch user info!' }));
  }
}

function* getProjectInfo(action) {
  try {
  // console.log(action);
  const  id  = action.payload;
  const response  = yield call(() => getProjectDetailsByUserId(id))
    yield put(getProjectInfoSuccess(response));
  } catch (error) {
    // console.log(error);
    yield put(getProjectInfoFailure(error.message));
    // yield put(setAlert({ type: 'error', message: 'Failed to fetch user info!' }));
  }
}

export function* watchUserSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(getUserInfoRequest.type, getUserInfo);
  yield takeLatest(getProjectInfoRequest.type, getProjectInfo);
}
