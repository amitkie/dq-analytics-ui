// // src/features/alert/alertSaga.js
// import { takeEvery, put, delay } from 'redux-saga/effects';
// import { setAlert, clearAlert } from './alertSlice';

// function* handleSetAlert(action) {
//   yield delay(3000); // Clear the alert after 3 seconds
//   yield put(clearAlert());
// }

// export default function* alertSaga() {
//   yield takeEvery(setAlert.type, handleSetAlert);
// }
