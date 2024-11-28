import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/adminCart");
        console.log(res.data, "res3434");

        const email = localStorage.getItem("userEmail");
        const filteredData = res.data.filter((el) => el.userEmail === email);
        console.log(filteredData);

        setOrders(filteredData); // Update state with filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Order Status</h1>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} style={styles.card}>
            <img src={order.image} alt={order.name} style={styles.image} />
            <div style={styles.details}>
              <h2>{order.name}</h2>
              <p>
                <strong>Price:</strong> ${order.price}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>User Email:</strong> {order.userEmail}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found for the current user.</p>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  details: {
    textAlign: "left",
  },
};

export default OrderStatus;
