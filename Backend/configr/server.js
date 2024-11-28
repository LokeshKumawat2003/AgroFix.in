const Uri =
  "mongodb://127.0.0.1:27017/AgroFix";

const mongoose = require("mongoose");

const GetmongoDb = async () => {
  try {
    await mongoose.connect(Uri);
    console.log("DataBase is Connect");
  } catch (error) {
    console.log("DataBase Err", error);
  }
};
module.exports = GetmongoDb;
