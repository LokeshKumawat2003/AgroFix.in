import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../ConponentsStyle/sidebar.css";

const Sidebar = ({ sidbars }) => {
  const handleSidebarClick = () => {
    sidbars();  // assuming sidbars is a function passed as a prop to toggle visibility
  };

  return (
    <div
      className="sidebar-sid"
      onClick={handleSidebarClick}
      style={{ display: sidbars ? "block" : "none" }} // Update this condition based on the prop or state.
    >
      <div className="sidrbar-box">
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/status">Orders</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
