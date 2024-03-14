import React, { useState } from "react";
import { useOrders } from "../data/orders";
import "../styles/OrdersManagement.css";

function OrdersManagement() {
  const { orders, updateOrderStatus, deleteOrder, addOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [newOrderStatus, setNewOrderStatus] = useState("");

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = () => {
    updateOrderStatus(selectedOrder.id, orderStatus);
    setSelectedOrder(null);
    setOrderStatus("");
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order.status);
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId);
    setSelectedOrder(null);
  };

  const handleAddOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      customerName,
      orderDate,
      status: newOrderStatus,
      expectedDeliveryDate: "2024-05-08", // Just a placeholder for demonstration
    };
    addOrder(newOrder);
    setCustomerName("");
    setOrderDate("");
    setNewOrderStatus("");
  };

  return (
    <div className="orders-management">
      <h2>Orders Management</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleViewDetails(order)}>
                  View Details
                </button>
                <button onClick={() => handleEditOrder(order)}>Edit</button>
                <button onClick={() => handleDeleteOrder(order.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="order-details">
          <h3>Order Details</h3>
          <p>Order ID: {selectedOrder.id}</p>
          <p>Customer Name: {selectedOrder.customerName}</p>
          <p>Order Date: {selectedOrder.orderDate}</p>
          <p>Status: {selectedOrder.status}</p>
          {selectedOrder === selectedOrder && (
            <div>
              <label>Update Status:</label>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button onClick={handleUpdateStatus}>Update</button>
            </div>
          )}
        </div>
      )}
      <h3>Add New Order</h3>
      <div className="add-order-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Order Date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />
        <select
          value={newOrderStatus}
          onChange={(e) => setNewOrderStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button onClick={handleAddOrder}>Add Order</button>
      </div>
    </div>
  );
}

export default OrdersManagement;
