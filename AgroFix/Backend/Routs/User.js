const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

userRouter.get("/", async (req, res) => {
  let users = await UserModel.find();
  res.send(users);
});

userRouter.post("/signup", async (req, res) => {
  console.log("body", req.body);
  const { name, email, password, phone, address } = req.body;
  const check_exist = await UserModel.find({ email });
  try {
    if (check_exist.length > 0) {
      res.status(404).send({ response: "user already registerd please login" });
    } else {
      bcrypt.hash(password, 4, async function (err, hash) {
        const userDetails = new UserModel({
          name,
          email,
          phone,
          address,
          password: hash,
        });
        await userDetails.save();
        res.status(200).send({ response: "user registerd successfully" });
      });
    }
  } catch (error) {
    res.status(404).send("something went wrong please try again");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const check_exist = await UserModel.find({ email });

  if (check_exist.length > 0) {
    try {
      const hased_password = check_exist[0].password;
      bcrypt.compare(password, hased_password, function (err, result) {
        if (result) {
          var token = jwt.sign({ userID: check_exist[0]._id }, "lokesh");
          res.send({ msg: "Login successfully", token: token });
        } else {
          res.status(404).send({ response: "Invalid Credential" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(404).send("something went wrong please try after sometime");
    }
  } else {
    res.status(400).send({ response: "please signup first" });
  }
});

module.exports = userRouter;
