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
  test("should render orders", () => {
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

    expect(
      //First order
      screen.getByText(/Test1 Name1/i) &&
        screen.getByText(/2023-06-01T12:00:00Z/i) &&
        screen.getByText(/123/i) &&
        screen.getByText(/Pending/i) &&
        //Second order
        screen.getByText(/Test2 Name2/i) &&
        screen.getByText(/2024-06-02T12:00:00Z/i) &&
        screen.getByText(/136/i) &&
        screen.getByText(/Closed/i)
    ).toBeInTheDocument();
  });

  test("should render error message if error", () => {
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

  test("should navigate to order info on click", () => {
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
  test("should match orders table snapshot", () => {
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
