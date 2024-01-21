import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    initialDate: {
      type: Date,
      required: true,
    },
    approvalDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Bill = mongoose.model("Bill", billSchema);
