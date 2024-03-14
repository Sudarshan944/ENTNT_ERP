// orders.js
import { useState, createContext, useContext, useEffect } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders
      ? JSON.parse(storedOrders)
      : [
          {
            id: 1,
            customerName: "John Doe",
            orderDate: "2024-05-01",
            status: "Pending",
            expectedDeliveryDate: "2024-05-08",
          },
          {
            id: 2,
            customerName: "Jane Smith",
            orderDate: "2024-05-03",
            status: "Shipped",
            expectedDeliveryDate: "2024-05-10",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <OrdersContext.Provider
      value={{ orders, updateOrderStatus, deleteOrder, addOrder }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
