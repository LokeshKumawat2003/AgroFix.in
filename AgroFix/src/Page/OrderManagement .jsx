import React, { useEffect, useState } from "react";
import "../PageStyle/adminPage.css";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get("http://localhost:8080/adminCart/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchApi();
  }, []);

  const updateOrderStatus = async (id, order) => {
    let newStatus;
    if (order.status === "Pending") {
      newStatus = "In Progress";
    } else if (order.status === "In Progress") {
      newStatus = "Delivered";
    } else {
      return;
    }
    order.status = newStatus;
    console.log(order);
    const response = await axios.put(
      `http://localhost:8080/adminCart/${id}`,
      order,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const Delete = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/adminCart/${id}`
    );
  };

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-item" key={order._id}>
            <h2>Order ID: {order.user}</h2>
            <p>
              <strong>Buyer:</strong> {order.userEmail}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Items:</strong> {order.name}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <button
              onClick={() => updateOrderStatus(order._id, order)}
              disabled={order.status === "Delivered"}
            >
              {order.status === "Delivered" ? "Completed" : "Update Status"}
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => Delete(order._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
