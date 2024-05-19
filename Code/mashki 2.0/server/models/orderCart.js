import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true},
    qty : {type: Number},
    area: {type: String},
    delivered: {type: Boolean, default: false},
});
const OrderCart = mongoose.model('OrderCart', userSchema);
export default OrderCart;
