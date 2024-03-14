// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductsManagement from "./components/ProductsManagement";
import OrdersManagement from "./components/OrdersManagement";
import OrdersCalendar from "./components/OrdersCalendar";
import { ProductsProvider } from "./data/products";
import { OrdersProvider } from "./data/orders";
import "./App.css";

function App() {
  return (
    <Router>
      <ProductsProvider>
        <OrdersProvider>
          <div className="App">
            <nav>
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/calendar">Orders Calendar</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/products" element={<ProductsManagement />} />
              <Route path="/orders" element={<OrdersManagement />} />
              <Route path="/calendar" element={<OrdersCalendar />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </OrdersProvider>
      </ProductsProvider>
    </Router>
  );
}

export default App;
