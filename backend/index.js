import express from "express";
import bodyParser from "body-parser";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import billRouter from "./routes/billRoute.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import { verifyToken } from "./jwt/jwt.js";

const app = express();

// Allow requests only from a specific origin
// Allow requests with specific methods
// Allow requests with specific headers
app.use(
  cors({
    // origin: "*",
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
app.use(verifyToken);

// const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

// routes
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
