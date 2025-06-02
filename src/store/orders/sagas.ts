import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_ORDERS_REQUEST,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from "./actions";

async function fetchOrdersApi() {
  const res = await fetch("https://683d69ca199a0039e9e55d2c.mockapi.io/orders");
  return await res.json();
}

function* fetchOrdersSaga(): Generator<any, void, any> {
  try {
    const data = yield call(fetchOrdersApi);
    yield put(fetchOrdersSuccess(data));
  } catch (error: any) {
    yield put(fetchOrdersFailure(error.message));
  }
}

export function* ordersRootSaga() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersSaga);
}
