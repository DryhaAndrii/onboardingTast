import { Order } from "../../types/Order";

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}
