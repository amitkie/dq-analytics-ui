// src/app/saga.js

import { all } from "redux-saga/effects";
import { watchUserSaga } from "../features/user/userSaga";

export default function* rootSaga() {
  yield all([watchUserSaga()]);
}
