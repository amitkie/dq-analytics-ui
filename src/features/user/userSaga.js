import { put, takeEvery, delay, call } from "redux-saga/effects";
import { getUserDataStart } from "./userSlice";

const userInfo = "";
// TODO userInfo will come from service

function* getUserDetailsSaga(action) {
  const { data } = yield call(userInfo);
  sessionStorage.setItem("userInfo", JSON.stringify(data));
  yield put(getUserDataSuccess(data));
}

export function* watchUserSaga() {
  yield takeEvery(getUserDataStart, getUserDetailsSaga);
}
