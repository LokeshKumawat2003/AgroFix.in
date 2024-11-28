import React, { useState } from "react";
import axios from "axios";
import "../PageStyle/newproduct.css";

const ProductForm = ({ setProducts }) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    off: "",
    inStock: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseFloat(formData.price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (formData.off && (formData.off < 0 || formData.off > 100)) {
      setError("Discount percentage must be between 0 and 100.");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .post("http://localhost:8080/product", formData)
      .then((response) => {
        if (typeof setProducts === "function") {
          setProducts((prev) => [...prev, response.data]);
        } else {
          console.error("setProducts is not a function");
        }
        setFormData({
          image: "",
          name: "",
          description: "",
          price: "",
          off: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setError("There was an error adding the product. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="newProduct">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Discount Percentage:</label>
          <input
            type="number"
            name="off"
            value={formData.off}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
