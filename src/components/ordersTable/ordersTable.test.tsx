import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { OrdersTable } from "./ordersTable";

import { useAppDispatch } from "../../redux/rootReducer";
import { fetchOrdersRequest } from "../../redux/ducks/orders";

jest.mock("react-redux", () => ({
  __esModule: true,
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/rootReducer", () => ({
  __esModule: true,
  useAppDispatch: jest.fn(),
}));

jest.mock("../../redux/ducks/orders", () => ({
  __esModule: true,
  fetchOrdersRequest: jest.fn(),
}));

const fakeOrders = [
  {
    id: "1",
    name: "Test1 Name1",
    date: "2023-06-01T12:00:00Z",
    price: 123,
    status: "Pending",
    info: "Some info",
  },
  {
    id: "2",
    name: "Test2 Name2",
    date: "2024-06-02T12:00:00Z",
    price: 136,
    status: "Closed",
    info: "Another info",
  },
];

const fakeAppSelectorResult = {
  error: null,
  loading: false,
  data: fakeOrders,
};

const fakeAppSelectorErrorResult = {
  error: "Some error",
  loading: false,
  data: [],
};

describe("OrderInfo", () => {
  test("renders orders table", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(
      fakeAppSelectorResult
    );

    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

    (useLocation as jest.Mock).mockReturnValue({
      search: "?id=123",
    });

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    (fetchOrdersRequest as jest.Mock).mockReturnValue(jest.fn());

    render(<OrdersTable />);

    //First order
    expect(screen.getByText(/Test1 Name1/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-06-01T12:00:00Z/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();

    //Second order
    expect(screen.getByText(/Test2 Name2/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-06-02T12:00:00Z/i)).toBeInTheDocument();
    expect(screen.getByText(/136/i)).toBeInTheDocument();
    expect(screen.getByText(/Closed/i)).toBeInTheDocument();
  });

  test("renders error", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(
      fakeAppSelectorErrorResult
    );

    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

    (useLocation as jest.Mock).mockReturnValue({
      search: "?id=123",
    });

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    (fetchOrdersRequest as jest.Mock).mockReturnValue(jest.fn());

    render(<OrdersTable />);

    expect(screen.getByText(/Error: Some error/i)).toBeInTheDocument();
  });

  test("Navigate to order info", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(
      fakeAppSelectorResult
    );

    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

    (useLocation as jest.Mock).mockReturnValue({
      search: "?id=123",
    });

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (fetchOrdersRequest as jest.Mock).mockReturnValue(jest.fn());

    render(<OrdersTable />);

    screen.getByText(/Test1 Name1/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/orderInfo?id=1");
  });
});

describe("OrderTable snapshot", () => {
  test("matches snapshot", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(
      fakeAppSelectorResult
    );

    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());

    (useLocation as jest.Mock).mockReturnValue({
      search: "?id=123",
    });

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    (fetchOrdersRequest as jest.Mock).mockReturnValue(jest.fn());
    const { asFragment } = render(<OrdersTable />);
    expect(asFragment()).toMatchSnapshot();
  });
});
