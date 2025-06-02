import { Routes, Route } from "react-router-dom";
import OrdersTable from "./components/ordersTable/ordersTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersTable />} />
    </Routes>
  );
}

export default App;
