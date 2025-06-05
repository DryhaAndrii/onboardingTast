import { call, put, takeLatest } from "redux-saga/effects";
import { RootState } from "../rootReducer";
import { Order } from "../../types/Order";

export const FETCH_ORDERS_REQUEST = "orders/FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "orders/FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "orders/FETCH_ORDERS_FAILURE";

interface OrdersState {
  data: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null,
};

export default function ordersReducer(
  state = initialState,
  action: any
): OrdersState {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });

export const fetchOrdersSuccess = (orders: Order[]) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});
export const fetchOrdersFailure = (error: string) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
});

async function fetchOrdersApi() {
  const res = await fetch("https://683d69ca199a0039e9e55d2c.mockapi.io/orders");

  if (!res.ok) {
    const message = await res.json();
    throw new Error(`HTTP ${res.status}: ${message}`);
  }

  return await res.json();
}

function* fetchOrdersSaga() {
  try {
    const orders: Order[] = yield call(fetchOrdersApi);
    yield put(fetchOrdersSuccess(orders));
  } catch (error: any) {
    yield put(fetchOrdersFailure(error.message));
  }
}

export function* ordersSaga() {
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersSaga);
}

export const selectOrderById = (id: string) => (state: RootState) =>
  state.orders.data.find((order) => order.id === id);
