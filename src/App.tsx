import { Routes, Route } from "react-router-dom";
import OrdersTable from "./components/ordersTable";
import OrderInfo from "./components/orderInfo";



function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersTable />} />
      <Route path="/orderInfo" element={<OrderInfo />} />
    </Routes>
  );
}

export default App;
