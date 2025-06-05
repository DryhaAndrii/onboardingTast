import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import ordersReducer from "./ducks/orders";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { ordersSaga } from "./ducks/orders";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(function* () {
  yield ordersSaga();
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
