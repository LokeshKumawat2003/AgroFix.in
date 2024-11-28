import React from "react";
import "../ConponentsStyle/search.css";

const SearchResultPage = ({ filteredResults }) => {
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
    <div className="search-result-page">
      <h1>Your Results</h1>
      <div className="product-list">
        {filteredResults.length === 0 ? (
          <p>No products found matching your search.</p>
        ) : (
          filteredResults.map((product) => (
            <div className="product-item" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> {product.price}
              </p>
              <div className="search-addCart">
                <button onClick={() => addtoCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
