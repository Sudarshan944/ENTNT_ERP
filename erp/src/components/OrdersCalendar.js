import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useOrders } from "../data/orders";
import "../styles/OrdersCalendar.css";

function OrdersCalendar() {
  const { orders } = useOrders();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ordersOnSelectedDate, setOrdersOnSelectedDate] = useState([]);

  useEffect(() => {
    const filteredOrders = orders.filter((order) => {
      const orderOrderDate = new Date(order.orderDate);
      const orderDeliveryDate = new Date(order.expectedDeliveryDate);

      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedDay = selectedDate.getDate();

      return (
        (orderOrderDate.getFullYear() === selectedYear &&
          orderOrderDate.getMonth() === selectedMonth &&
          orderOrderDate.getDate() === selectedDay) ||
        (orderDeliveryDate.getFullYear() === selectedYear &&
          orderDeliveryDate.getMonth() === selectedMonth &&
          orderDeliveryDate.getDate() === selectedDay)
      );
    });
    setOrdersOnSelectedDate(filteredOrders);
  }, [orders, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="orders-calendar">
      <h2>Orders Calendar</h2>
      <div>
        <Calendar value={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <h3>Orders for {selectedDate.toDateString()}</h3>
        {ordersOnSelectedDate.length > 0 ? (
          <ul>
            {ordersOnSelectedDate.map((order) => (
              <li key={order.id}>
                Order ID: {order.id}, Customer: {order.customerName}, Order
                Date: {new Date(order.orderDate).toDateString()}, Expected
                Delivery Date:{" "}
                {new Date(order.expectedDeliveryDate).toDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders for this date.</p>
        )}
      </div>
    </div>
  );
}

export default OrdersCalendar;
