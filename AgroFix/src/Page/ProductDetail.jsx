import React from "react";
import "../PageStyle/productdatile.css";

const ProductDetail = () => {
  const product = {
    id: "1",
    name: "Laptop",
    description: "A high-performance laptop with cutting-edge features.",
    price: 999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLWhs5nFNhqei8R6p3xyJGLuGctO5AWMpnuA&s",
  };

  const handleAddToCart = () => {
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="product-detail">
      <h1>Product Detail</h1>
      <div className="product-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
