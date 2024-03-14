// components/Dashboard.js
import React from "react";
import { useProducts } from "../data/products";
import { useOrders } from "../data/orders";
import "../styles/Dashboard.css";

function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Total Products: {products.length}</p>
      <p>Total Orders: {orders.length}</p>
    </div>
  );
}

export default Dashboard;
