import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    InvoiceCode: {
      type: String,
      required: true,
    },
    InvoiceNum: {
      type: String,
      required: true,
    },
    InvoiceDate: {
      type: String,
      required: true,
    },
    PurchaserName: {
      type: String,
      required: true,
    },
    PurchaserRegisterNum: {
      type: String,
      required: true,
    },
    SellerName: {
      type: String,
      required: true,
    },
    SellerRegisterNum: {
      type: String,
      required: true,
    },
    TotalAmount: {
      type: String,
      required: true,
    },
    TotalTax: {
      type: String,
      required: true,
    },
    InvoiceType: {
      type: String,
      required: true,
    },
    InvoiceTag: {
      type: String,
      required: true,
    },
    Remarks: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    launcher: {
      type: String,
      requeired: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
