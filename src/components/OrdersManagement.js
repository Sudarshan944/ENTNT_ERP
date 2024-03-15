import React, { useState } from "react";
import { useOrders } from "../data/orders";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/OrdersManagement.css";

function OrdersManagement() {
  const { orders, updateOrderStatus, deleteOrder, addOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const pagesVisited = currentPage * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    pagesVisited,
    pagesVisited + itemsPerPage
  );
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

  // Change page
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = () => {
    updateOrderStatus(selectedOrder.id, orderStatus);
    setSelectedOrder(null);
    setOrderStatus("");
    toast.success(`Order ${selectedOrder.id} status updated to ${orderStatus}`);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order.status);
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId);
    setSelectedOrder(null);
    toast.success(`Order ${orderId} deleted`);
  };

  const handleAddOrder = () => {
    // Calculate expected delivery date by adding 7 days to the order date
    const orderDateObject = new Date(orderDate);
    const expectedDeliveryDateObject = new Date(
      orderDateObject.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    // Format expected delivery date as YYYY-MM-DD
    const expectedDeliveryDate = expectedDeliveryDateObject
      .toISOString()
      .split("T")[0];
    const newOrder = {
      id: orders.length + 1,
      customerName,
      orderDate,
      status: newOrderStatus,
      expectedDeliveryDate,
      totalPrice: 100,
    };
    addOrder(newOrder);
    setCustomerName("");
    setOrderDate("");
    setNewOrderStatus("");
    toast.success(`New order ${newOrder.id} added`);
  };

  return (
    <div className="orders-management">
      <h2>Orders Management</h2>
      <ToastContainer />
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table table-striped">
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
          {currentOrders.map((order) => (
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

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

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
