import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true},
    feedback: {type: String},
});
const Feedback = mongoose.model('Feedback', userSchema);
export default Feedback;
