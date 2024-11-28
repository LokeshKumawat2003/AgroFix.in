import { NavLink } from "react-router-dom";
import "../PageStyle/adminPage.css";

const AdminPage = () => {

  const activeStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const inactiveStyle = {
    color: "white",
    fontWeight: "normal",
  };

  return (
    <>
      <div className="adminData" style={{ marginTop: "90px", padding: "20px" }}>
        <h1>Admin Dashboard</h1>
        <div className="admin-links">
          <NavLink
            to="/newproduct"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Product Management
          </NavLink>
          <NavLink
            to="/oders"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Order Management
          </NavLink>
          <NavLink
            to="/adminData"
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Product Management
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
