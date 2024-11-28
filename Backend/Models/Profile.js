const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  address: { type: String, default: "" },
  picture: { type: String },
});
const ProfileModle = mongoose.model("Profile", profileSchema);
module.exports = ProfileModle;
