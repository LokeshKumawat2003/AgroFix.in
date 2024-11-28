import React, { useEffect, useState } from "react";
import "../PageStyle/cart.css";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("tokenAgrofix");
    const email = localStorage.getItem("userEmail");
    if (token) {
      const CartApi = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
     let filterdata=     response.data.filter((el, i) => el.userEmail == email);
          setCartItems(filterdata);
        } catch (error) {
          console.error("Error fetching cart data:", error);
          setError("Error fetching cart data. Please try again later.");
        }
      };
      CartApi();
    }
  }, []);

  const handleQuantityChange = async (id, delta) => {
    const newQuantity = Math.max(
      1,
      cartItems.find((item) => item._id === id).quantity + delta
    );
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      await axios.put(
        `http://localhost:8080/cart/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAgrofix")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Error updating quantity. Please try again later.");
    }
  };

  const handleRemoveItem = async (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));

    try {
      await axios.delete(`http://localhost:8080/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenAgrofix")}`,
        },
      });
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Error removing item. Please try again later.");
    }
  };
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const price=(prices)=>{
    alert( `total Price is ${prices}`)
  }
  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Show error if any */}
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-item-button"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${calculateTotal()}</h2>
            <button className="checkout-button" onClick={()=>price(calculateTotal())}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
