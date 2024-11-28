import React, { useState } from "react";
import "../PageStyle/adminPage.css";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Apple", price: 3.5, stock: 50 },
    { id: 2, name: "Banana", price: 1.2, stock: 100 },
  ]);

  const addInventoryItem = (newItem) => {
    setInventory((prevInventory) => [...prevInventory, newItem]);
  };

  const updateInventoryItem = (id, updatedItem) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const removeInventoryItem = (id) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="inventory-management">
      <h1>Inventory Management</h1>
      <div className="inventory-list">
        {inventory.map((item) => (
          <div className="inventory-item" key={item.id}>
            <h2>{item.name}</h2>
            <p>
              <strong>Price:</strong> ${item.price.toFixed(2)}
            </p>
            <p>
              <strong>Stock:</strong> {item.stock} kg
            </p>
            <button
              onClick={() =>
                updateInventoryItem(item.id, {
                  ...item,
                  stock: item.stock + 10,
                })
              }
            >
              Restock +10
            </button>
            <button onClick={() => removeInventoryItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="add-item-form">
        <h2>Add New Item</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItem = {
              id: Date.now(),
              name: e.target.name.value,
              price: parseFloat(e.target.price.value),
              stock: parseInt(e.target.stock.value),
            };
            addInventoryItem(newItem);
            e.target.reset();
          }}
        >
          <input type="text" name="name" placeholder="Name" required />
          <input
            type="number"
            name="price"
            placeholder="Price (per kg)"
            step="0.01"
            required
          />
          <input type="number" name="stock" placeholder="Stock (kg)" required />
          <button type="submit" className="new-product-add">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryManagement;
