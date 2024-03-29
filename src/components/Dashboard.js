import React, { useEffect, useState } from "react";
import { useProducts } from "../data/products";
import { useOrders } from "../data/orders";
import { Pie, Line } from "react-chartjs-2";
import "../styles/Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement
);

function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const [productData, setProductData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      // Prepare data for product pie chart
      const productLabels = products.map((product) => product.name);
      const productQuantities = products.map((product) => product.stock);
      setProductData({
        labels: productLabels,
        datasets: [
          {
            label: "Products",
            data: productQuantities,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      });
    }

    if (Array.isArray(orders) && orders.length > 0) {
      // Prepare data for order line graph
      const statusCounts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(statusCounts);
      const data = Object.values(statusCounts);

      setOrderData({
        labels: labels,
        datasets: [
          {
            label: "Number of Orders",
            data: data,
            borderColor: "rgba(75, 192, 192, 0.6)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
            tension: 0,
          },
        ],
      });
    }
  }, [products, orders]);

  return (
    <div className="dashboard">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Product Quantity Distribution</h4>
            </div>
            <div className="card-body">
              {productData && <Pie data={productData} />}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Number of Orders by Status</h4>
            </div>
            <div className="card-body">
              {orderData && (
                <Line
                  data={orderData}
                  options={{ scales: { y: { beginAtZero: true } } }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
