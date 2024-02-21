import express from "express";
import Bill from "../models/billModel.js";

const router = express.Router();
router.use(express.json());

router.get("/all", async (req, res) => {
  try {
    const bills = await Bill.find({});
    return res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    if (
      !req.body.InvoiceCode ||
      !req.body.InvoiceNum ||
      !req.body.InvoiceDate ||
      !req.body.PurchaserName ||
      !req.body.PurchaserRegisterNum ||
      !req.body.SellerName ||
      !req.body.SellerRegisterNum ||
      !req.body.TotalAmount ||
      !req.body.TotalTax ||
      !req.body.InvoiceType ||
      !req.body.InvoiceTag ||
      !req.body.Remarks ||
      !req.body.launcher ||
      !req.body.status
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const newBill = new Bill({
      InvoiceCode: req.body.InvoiceCode,
      InvoiceNum: req.body.InvoiceNum,
      InvoiceDate: req.body.InvoiceDate,
      PurchaserName: req.body.PurchaserName,
      PurchaserRegisterNum: req.body.PurchaserRegisterNum,
      SellerName: req.body.SellerName,
      SellerRegisterNum: req.body.SellerRegisterNum,
      TotalAmount: req.body.TotalAmount,
      TotalTax: req.body.TotalTax,
      InvoiceType: req.body.InvoiceType,
      InvoiceTag: req.body.InvoiceTag,
      Remarks: req.body.Remarks,
      launcher: req.body.launcher,
      status: req.body.status,
    });
    const bill = await Bill.create(newBill);
    return res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
