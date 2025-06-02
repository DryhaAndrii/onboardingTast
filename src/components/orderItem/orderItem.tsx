import { TableRow, TableCell } from "@mui/material";

interface OrderItemProps {
  name: string;
  price: number;
  status: "pending" | "shipped" | "cancelled";
}

export default function OrderItem({ name, price, status }: OrderItemProps) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>${price.toFixed(2)}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
}
