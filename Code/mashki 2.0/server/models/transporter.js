import mongoose from "mongoose";
const transporterSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  cnic: { type: String, required: true },
  usertype: { type: String, default: 'customer' },
});
const Transporter = mongoose.model('Transporter', transporterSchema);
export default Transporter;
