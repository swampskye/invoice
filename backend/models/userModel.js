import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    created: { type: Date, default: Date.now },
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
