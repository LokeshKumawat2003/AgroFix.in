const express = require("express");
const mongoose = require("mongoose");
const ProfileModle = require("../Models/Profile");
const profileRoute = express.Router();
const jwt = require("jsonwebtoken");
profileRoute.get("/", async (req, res) => {
  try {
    const profile = await ProfileModle.find();
    res.json(profile);
    const { id } = req.params;
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

profileRoute.put("/:id", async (req, res) => {
  let token = req.headers.token;

  try {
    const decoded = jwt.verify(token, "lokesh");
    let user = decoded.userID;
    let payload = req.body;
    payload.user = user;
    const { id } = req.params;

    console.log(id);
    const profile = await ProfileModle.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.send(profile);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = profileRoute;
