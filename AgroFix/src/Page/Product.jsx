import React, { useEffect, useState } from "react";
import "../PageStyle/product.css";
import axios from "axios";

const ProductPage = () => {

  const [products, SetProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/product")
      .then((response) => {
        SetProduct(response.data);
      })
      .catch((error) => {
        setError("Error fetching products");
        console.error("There was an error fetching the products:", error);
      });
  }, []);
  const addtoCart = async (product) => {
    alert("Product add on Cart");
    let email = localStorage.getItem("userEmail");
    const productWithUser = { ...product, userEmail: email };
    const res = axios.post(
      "http://localhost:8080/cart/addtoCart",
      productWithUser,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenAgrofix")}`,
        },
      }
    );
  };

  return (
    <div className="product-container">
      {products.map((product, index) => {
        const discountedPrice = product.discount
          ? (product.price * (100 - product.discount)) / 100
          : product.price;

        return (
          <div className="product-info" key={index}>
            {product.discount > 0 && (
              <p className="discount-label">{product.discount}% off!</p>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="text-container">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <h2 className="product-price">
                ${discountedPrice.toFixed(2)}
                {product.discount > 0 && (
                  <span className="original-price">
                    <s>${product.price.toFixed(2)}</s>
                  </span>
                )}
              </h2>

              <div className="cart-btn">
                {product.inStock ? (
                  <button
                    className="add-to-cart-button"
                    onClick={() => addtoCart(product)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button className="out-of-stock-button" disabled>
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductPage;
