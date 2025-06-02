import { TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";

const StyledCell = styled(TableCell)`
  &:hover {
    background-color: #f0f0f0;
  }
  cursor: pointer;
`;

export default function HeadOfTable() {
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
