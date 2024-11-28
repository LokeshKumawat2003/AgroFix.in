import React, { useState } from "react";
import "../PageStyle/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from 'react-hot-toast'
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("userEmail",formData.email)
        setSuccess("Login successful!");
        setError("");
        navigate("/");
        alert("Login successful!");
        let tokendata = localStorage.setItem(
          "tokenAgrofix",
          response.data.token
        );

        console.log(response.data);
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-box">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Login</h1>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-footer">
            Don't have an account?
            <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
