import '../PageStyle/productdata.css';
import React, { useState, useEffect } from "react";

const AdminData = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    off: "",
    inStock: false
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/product");
      if (!response.ok) throw new Error("Failed to fetch products.");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name.trim() || isNaN(newProduct.price) || newProduct.price <= 0) {
      alert("Please enter a valid product name and price.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setNewProduct({
          name: "",
          price: "",
          image: "",
          description: "",
          off: "",
          inStock: false
        });
        fetchProducts();
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = async () => {
    if (!editingProduct.name.trim() || isNaN(editingProduct.price) || editingProduct.price <= 0) {
      alert("Please enter a valid product name and price.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/product/${editingProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert("Failed to save product changes.");
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="form-container">
        <h2>Add New Product</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Product Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <textarea
          className="input-field"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Product Discount (%)"
          value={newProduct.off}
          onChange={(e) => setNewProduct({ ...newProduct, off: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newProduct.inStock}
            onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
          />
          In Stock
        </label>
        <button className="button" onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="product-list">
        <h2>Manage Products</h2>
        {products.map((product) => (
          <div className="product-item" key={product._id}>
            {editingProduct?._id === product._id ? (
              <div>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="input-field"
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="input-field"
                />
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="input-field"
                />
                <input
                  type="number"
                  value={editingProduct.off}
                  onChange={(e) => setEditingProduct({ ...editingProduct, off: e.target.value })}
                  className="input-field"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  />
                  In Stock
                </label>
                <button className="button" onClick={handleSaveEdit}>Save</button>
                <button className="cancel-button" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{product.name} - ${product.price} ({product.inStock ? "In Stock" : "Out of Stock"})</span>
                <img src={product.image} alt={product.name} className="product-image" />
                <p>{product.description}</p>
                <p>Discount: {product.off}%</p>
                <button className="edit-button" onClick={() => handleEditProduct(product)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminData;
