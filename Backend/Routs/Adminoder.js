const express = require("express");
const CartModle = require("../Models/CaerModel");

const cartUpdate = express.Router();

cartUpdate.get("/", async (req, res) => {
  let data = await CartModle.find();
  res.send(data);
});

cartUpdate.put("/:id", async (req, res) => {
  try {
    console.log(req.body);
    const cartdata = await CartModle.findByIdAndUpdate(req.params.id, req.body);
    res.send(cartdata);
  } catch (error) {}
});

cartUpdate.delete("/:id", async (req, res) => {
    try {
      console.log(req.body);
      const cartdata = await CartModle.findByIdAndDelete(req.params.id);
      res.send(cartdata);
    } catch (error) {}
  });
  


module.exports = cartUpdate;
