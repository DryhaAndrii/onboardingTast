import styled from "styled-components";
import { Table, TableBody, Typography, Pagination } from "@mui/material";
import OrderItem from "../orderItem/orderItem";
import { useLocation, useNavigate } from "react-router-dom";

import { Order } from "../../types/Order";
import { useEffect, useState } from "react";
import HeadOfTable from "./tableHead";

import { useAppDispatch, useAppSelector } from "../../store";
import { fetchOrdersRequest } from "../../store/orders/actions";
import { selectOrders, selectLoading } from "../../store/orders/selectors";

const TableContainer = styled.div`
  padding: 24px;
`;

const StyledTable = styled(Table)`
  table-layout: fixed;
  width: 100%;
`;

const PAGE_SIZE = 10;

export default function OrdersTable() {
  const [paginatedOrders, setPaginatedOrders] = useState<Order[]>([]);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const fetchedOrders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectLoading);

  const [orders, setOrders] = useState<Order[]>([]);

  const page = parseInt(
    new URLSearchParams(location.search).get("page") || "1",
    10
  );
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  useEffect(() => {
    setOrders(fetchedOrders);
  }, [fetchedOrders]);

  useEffect(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    setPaginatedOrders(orders.slice(startIndex, endIndex));
  }, [orders, page]);

  const handlePageChange = (_: any, value: number) => {
    navigate(`/?page=${value}`);
  };

  if (loading || orders.length === 0 || paginatedOrders.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer>
      <Typography variant="h6" onClick={() => navigate("/")}>
        Orders
      </Typography>
      <StyledTable>
        <HeadOfTable setPaginatedOrders={setPaginatedOrders} />
        <TableBody>
          {paginatedOrders.map((order: Order) => (
            <OrderItem
              date={order.date}
              key={order.id}
              id={order.id}
              name={order.name}
              price={order.price}
              status={order.status}
            />
          ))}
        </TableBody>
      </StyledTable>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </TableContainer>
  );
}
