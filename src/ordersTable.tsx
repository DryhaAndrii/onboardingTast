import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "./redux/rootReducer";
import { fetchOrdersRequest } from "./redux/ducks/orders";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridPaginationModel,
} from "@mui/x-data-grid";

export default function OrdersTable() {
  const dispatch = useAppDispatch();
  const { error, loading, data } = useSelector(
    (state: RootState) => state.orders
  );

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const sortFieldFromUrl = searchParams.get("sort") || "date";
  const sortDirFromUrl =
    (searchParams.get("sortDir") as "asc" | "desc") || "desc";

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: pageFromUrl - 1,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: sortFieldFromUrl, sort: sortDirFromUrl },
  ]);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const newPage = paginationModel.page + 1;
    if (newPage !== pageFromUrl) {
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [paginationModel, navigate, location.search, pageFromUrl]);

  useEffect(() => {
    if (sortModel.length === 0) return;
    const { field, sort } = sortModel[0];
    const params = new URLSearchParams(location.search);

    if (field !== sortFieldFromUrl || sort !== sortDirFromUrl) {
      params.set("sort", field);
      params.set("sortDir", sort ?? "asc");
      params.set("page", "1");
      navigate(`?${params.toString()}`, { replace: true });
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }
  }, [sortModel, navigate, location.search, sortFieldFromUrl, sortDirFromUrl]);

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 250 },
    { field: "price", headerName: "Price", width: 200, type: "number" },
    { field: "name", headerName: "Customer", width: 250 },
    { field: "status", headerName: "Status", width: 200 },
  ];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode="client"
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
}
