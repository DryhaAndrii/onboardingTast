import { TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { Order } from "../../types/Order";

const StyledCell = styled(TableCell)`
  &:hover {
    background-color: #f0f0f0;
  }
  cursor: pointer;
`;

interface Props {
  setPaginatedOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function HeadOfTable({ setPaginatedOrders }: Props) {
  const tableHeadClickHandler = (headName: string) => {
    console.log(headName);
  };
  return (
    <TableHead>
      <TableRow>
        <StyledCell onClick={() => tableHeadClickHandler("date")}>
          Date
        </StyledCell>
        <StyledCell onClick={() => tableHeadClickHandler("price")}>
          Price
        </StyledCell>
        <TableCell>Customer</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
  );
}
