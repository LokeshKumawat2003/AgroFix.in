import React, { useState } from "react";
import "../PageStyle/singup.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/signup",
        formData
      );

      if (response.status === 200) {
        setSuccess("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          number: "",
          password: "",
        });
        setError("");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("There was an error. Please try again later.");
    }
  };

  return (
    <div className="singup-box">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1 className="signup-title">Sign Up</h1>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="number">Phone Number</label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Enter your phone number"
              value={formData.number}
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

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <p className="signup-footer">
            Already have an account?
            <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
