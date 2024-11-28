import React, { useEffect, useState } from "react";
import "../ConponentsStyle/nav.css";
import { FiSearch } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchResultPage from "./Search";
const Nav = () => {

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(products);
  const [sidbars, Setsidbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const handelCart = () => {
    navigate("/cart");
  };
  const handellogin = () => {
    navigate("/login");
  };
  const handelhome = () => {
    navigate("/");
  };
  const Profile = () => {
    navigate("/profile");
  };
  const Sidbar = () => {
    Setsidbar((prev) => !prev);
    console.log(sidbars);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };
  let email = localStorage.getItem("userEmail");
  return (
    <div className="nav-box1">
      <nav>
        <div className="nav-box">
          <div className="logo-nav" onClick={handelhome}>
            <h1>AgroFix.In</h1>
          </div>
          <div className="search-nav-box">
            <input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FiSearch />
          </div>
          <div className="cart" onClick={handelCart}>
            <BsCart4 />
            <span>Cart</span>
          </div>

          {email ? (
            <div className="login" onClick={Profile}>
              <FaRegUserCircle />
              <span>Profile</span>
            </div>
          ) : (
            <div className="login" onClick={handellogin}>
              <FaRegUserCircle />
              <span>Login</span>
            </div>
          )}
          <div className="sidebar" onClick={Sidbar}>
            <FaBars />
          </div>
        </div>
        <div className="search-nav-box search2">
          <input
            type="search"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <FiSearch />
        </div>
      </nav>
      {sidbars ? <Sidebar sidbars={Sidbar} /> : ""}
      {searchQuery ? (
        <SearchResultPage filteredResults={filteredResults} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Nav;
