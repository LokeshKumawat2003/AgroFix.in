const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
  },

  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
},{timestamps:true});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
