import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 900 } }, // expires in 15 mins
  email: { type: String, required: true, unique: true, trim: true },
});

export default mongoose.model("OTP", OTPSchema);
