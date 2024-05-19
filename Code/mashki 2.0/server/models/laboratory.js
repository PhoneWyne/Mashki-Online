import mongoose from 'mongoose';

const laboratorySchema = new mongoose.Schema({
  labName: { type: String, required: true },
  labAddress: { type: String, required: true },
  labPhoneNumber: { type: String, required: true },
  labPassword: { type: String, required: true },
});

const Laboratory = mongoose.model('Laboratory', laboratorySchema);

export default Laboratory;
