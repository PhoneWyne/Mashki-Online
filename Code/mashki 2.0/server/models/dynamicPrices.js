import mongoose from "mongoose";
const priceSchema = new mongoose.Schema({
  itemName: { type: String, required: true }, 
  price: { type: Number, required: true },
});
const Price = mongoose.model('Price', priceSchema);
export default Price;

