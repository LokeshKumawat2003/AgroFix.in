const Uri =
  "mongodb+srv://Malviyajay:masai@cluster0.7xg3wkz.mongodb.net/AgroFix?retryWrites=true&w=majority";

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
