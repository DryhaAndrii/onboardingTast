export type Order = {
  id: number;
  name: string;
  price: number;
  status: "pending" | "shipped" | "cancelled";
};
