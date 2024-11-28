const express = require("express");
const CartModle = require("../Models/CaerModel");
const jwt = require("jsonwebtoken");
const cartRout = express.Router();

cartRout.get("/", async (req, res) => {
  try {
    const cartItems = await CartModle.find();
    res.send(cartItems);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token or error fetching cart",
      error: error.message,
    });
  }
});

cartRout.post("/addtoCart", async (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];
  console.log("Raw Token:", token);
  const decoded = jwt.verify(token, "lokesh");
  let user = decoded.userID;

  console.log(decoded.userID, "ytrytytytyty");

  let payload = req.body;
  payload.user = user;

  try {
    const cartProduct = new CartModle(payload);
    const savedCart = await cartProduct.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

cartRout.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const CartUpdate = await CartModle.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    if (CartUpdate) {
      res.status(201).json(CartUpdate, "cart update");
    } else {
      res.status(400).json("cart did not update");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

cartRout.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const CartDelete = await CartModle.findByIdAndDelete(id);
    if (CartDelete) {
      res.status(201).json(CartDelete, "cart Remove");
    } else {
      res.status(400).json("cart did not Remove");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = cartRout;
