import { TableRow, TableCell } from "@mui/material";
import styled from "styled-components";
import { Order } from "../../types/Order";

const StyledTableCell = styled(TableCell)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function OrderItem({ name, price, status, date }: Order) {
  return (
    <TableRow>
      <StyledTableCell>{date}</StyledTableCell>
      <StyledTableCell>${price}</StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{status}</StyledTableCell>
    </TableRow>
  );
}
