import styled from "styled-components";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Pagination,
} from "@mui/material";
import OrderItem from "../orderItem/orderItem";
import { useLocation, useNavigate } from "react-router-dom";

import { Order } from "../types/Order";
import ordersJson from "./orders.json";
const orders = ordersJson as Order[];

const TableContainer = styled.div`
  padding: 24px;
`;

const PAGE_SIZE = 10;

export default function OrdersTable() {
  const location = useLocation();
  const navigate = useNavigate();

  const page = parseInt(
    new URLSearchParams(location.search).get("page") || "1",
    10
  );
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const paginatedOrders = orders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handlePageChange = (_: any, value: number) => {
    navigate(`/?page=${value}`);
  };

  return (
    <TableContainer>
      <Typography variant="h6">
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
          {paginatedOrders.map((order) => (
            <OrderItem
              key={order.id}
              name={order.name}
              price={order.price}
              status={order.status}
            />
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </TableContainer>
  );
}
