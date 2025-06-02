import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import ordersReducer from "./orders/reducers";
import { ordersRootSaga } from "./orders/sagas";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(ordersRootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
