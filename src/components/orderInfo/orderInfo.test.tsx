import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import { OrderInfo } from "./orderInfo";

import { selectOrderById } from "../../redux/ducks/orders";
import { useAppSelector } from "../../redux/rootReducer";

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/rootReducer", () => ({
  __esModule: true,
  useAppSelector: jest.fn(),
}));

jest.mock("../../redux/ducks/orders", () => ({
  __esModule: true,
  selectOrderById: jest.fn(),
}));

const fakeOrder = {
  id: "123",
  name: "Test Order",
  date: "2023-06-01T12:00:00Z",
  price: 10000,
  status: "Pending",
  info: "Some info",
};

describe("OrderInfo", () => {
  test("should render order info", () => {
    window.history.pushState({}, "Test Title", "/test.html?id=123");

    (useAppSelector as jest.Mock).mockReturnValue(fakeOrder);

    (selectOrderById as jest.Mock).mockReturnValue(jest.fn());

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());

    render(<OrderInfo />);

    expect(
      screen.getByText(/Test Order/i) &&
        screen.getByText(/10000/i) &&
        screen.getByText(/2023/i) &&
        screen.getByText(/Pending/i) &&
        screen.getByText(/Some info/i)
    ).toBeInTheDocument();
  });

  test('should render "Order not found" if order is not found', () => {
    window.history.pushState({}, "Test Title", "/?id=999");

    (useAppSelector as jest.Mock).mockReturnValue(undefined);
    render(<OrderInfo />);

    expect(screen.getByText(/Order not found/i)).toBeInTheDocument();
  });

  test("should navigate to root when 'Go back' button is clicked", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<OrderInfo />);

    screen.getByText(/Go back/i).click();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

describe("OrderInfo snapshot", () => {
  test("should match order info snapshot", () => {
    window.history.pushState({}, "", "/?id=123");

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue(fakeOrder);

    const { asFragment } = render(<OrderInfo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
