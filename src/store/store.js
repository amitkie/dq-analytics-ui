import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import userSlice from "../features/user/userSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
