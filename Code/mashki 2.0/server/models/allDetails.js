import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  area: { type: String, required: true },
  hnum: { type: String, required: true },
  det1: { type: String, required: true },
  usertype: { type: String, default: 'customer' },
});
const AllDetails = mongoose.model('AllDetails', userSchema);
export default AllDetails;
