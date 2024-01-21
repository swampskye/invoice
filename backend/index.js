import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import billRouter from "./routes/billRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use("/bill", billRouter);
app.use("/user", userRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
