import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components", () => ({
  OrdersTable: () => <div>Orders Table Mock</div>,
  OrderInfo: () => <div>Order Info Mock</div>,
}));

test("renders OrdersTable on root path", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Orders Table Mock/i)).toBeInTheDocument();
});

test("renders OrderInfo on /orderInfo path", () => {
  render(
    <MemoryRouter initialEntries={["/orderInfo"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Order Info Mock/i)).toBeInTheDocument();
});
