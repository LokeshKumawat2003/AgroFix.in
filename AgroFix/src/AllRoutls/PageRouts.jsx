import React from "react";
import { Route, Routes } from "react-router-dom";

import OrderManagement from "../Page/OrderManagement ";
import InventoryManagement from "../Page/InventoryManagement ";
import AdminData from "../Page/ProductDAta";

const PageRouts = () => {
  return (
    <div style={{ marginTop: "150px" }}>
      <Routes>
        <Route path="/oders" element={<OrderManagement />} />
        <Route path="/newproduct" element={<InventoryManagement />} />
        <Route path="/adminData" element={<AdminData />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
};

export default PageRouts;
