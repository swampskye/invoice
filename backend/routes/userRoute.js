import express from "express";
import User from "../models/userModel.js";
import { generateToken } from "../jwt/jwt.js";
const router = express.Router();

router.use(express.json());

// get all users
router.get("/all", async (req, res) => {
  // res.send("Hello from user route");
  try {
    const user = await User.find({});
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a user from token
router.get("/profile", async (req, res) => {
  // res.status(200).json(req.user);
  try {
    // const user = await User.find({});
    const user = await User.findOne({ username: req.user.username });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add a user
router.post("/one", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await User.create(newUser);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== req.body.password) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    const token = generateToken({
      username: user.username,
      password: user.password,
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const user_check_username = await User.findOne({
      username: req.body.username,
    });
    if (user_check_username) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }
    const user_check_email = await User.findOne({ email: req.body.email });
    if (user_check_email) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    const createdUser = await User.create(newUser);
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
