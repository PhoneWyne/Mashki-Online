import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

export default User;
