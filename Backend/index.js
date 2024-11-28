const express = require("express");
const GetmongoDb = require("./configr/server");
const product = require("./Routs/Product");
const cartRout = require("./Routs/Cart");
const userRouter = require("./Routs/User");

const app = express();
app.use(express.json());
const cors = require('cors');
const Authentication = require("./Middleware/Auth");
const cartUpdate = require("./Routs/Adminoder");
const profileRoute = require("./Routs/Profile");

app.use(cors("*"))
app.get("/", (req, res) => {
  res.send("hellow");
});

app.use("/product", product);
app.use("/cart", cartRout);
app.use("/api",userRouter)
app.use("/api",userRouter)
app.use("/adminCart",cartUpdate)
app.use("/profile",profileRoute)
const GetServer = async () => {
  try {
    await app.listen(8080, () => {
      console.log("Server is Started");
      GetmongoDb();
    });
  } catch (error) {
    console.log("Server err", error);
  }
};
GetServer();
