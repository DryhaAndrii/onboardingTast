import { Routes, Route } from "react-router-dom";

import { OrderInfo, OrdersTable } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersTable />} />
      <Route path="/orderInfo" element={<OrderInfo />} />
    </Routes>
  );
}

export default App;
