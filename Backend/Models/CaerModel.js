const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userEmail: { type: String },
  image: { type: String, required: true },
  name: { type: String, require: true },
  price: { type: Number, required: true },
  status:{type:String,default:"Pending"},
  quantity: { type: Number, required: true, default: 1 },
});
const CartModle = mongoose.model("CartItem", cartSchema);
module.exports = CartModle;
