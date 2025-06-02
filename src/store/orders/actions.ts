export const FETCH_ORDERS_REQUEST = "orders/FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "orders/FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "orders/FETCH_ORDERS_FAILURE";

export const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });
export const fetchOrdersSuccess = (orders: any[]) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});
export const fetchOrdersFailure = (error: string) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
});
