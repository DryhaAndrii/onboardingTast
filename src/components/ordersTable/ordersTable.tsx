import styled from "styled-components";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import OrderItem from "../orderItem/orderItem";

interface Order {
  id: number;
  name: string;
  price: number;
  status: "pending" | "shipped" | "cancelled";
}

const orders: Order[] = [
  { id: 1, name: "John Doe", price: 120.5, status: "pending" },
  { id: 2, name: "Jane Smith", price: 89.99, status: "shipped" },
  { id: 3, name: "Bob Johnson", price: 45.0, status: "cancelled" },
];

const StyledPaper = styled(Paper)`
  padding: 24px;
`;

export default function OrdersTable() {
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              name={order.name}
              price={order.price}
              status={order.status}
            />
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
}
