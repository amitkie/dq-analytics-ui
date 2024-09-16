// import { call, put, takeLatest } from 'redux-saga/effects';
// import { hideAlert, showAlert } from './alertSlice';

// function* handleShowAlert(action) {
//   yield put(showAlert(action.payload));

//   // Automatically hide the alert after 5 seconds
//   yield call(function* () {
//     yield new Promise(resolve => setTimeout(resolve, 5000));
//     yield put(hideAlert());
//   });
// }

// export function* watchAlertSaga() {
//   yield takeLatest(showAlert.type, handleShowAlert);
// }
