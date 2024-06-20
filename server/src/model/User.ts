import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    domains: [{ type: mongoose.Schema.Types.ObjectId, ref: "Domain" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
