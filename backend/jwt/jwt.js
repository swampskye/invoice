import { JWT_KEY } from "../config.js";

import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign(
    {
      //   _id: user._id,
      username: user.username,
      //   email: user.email,
      password: user.password,
    },
    JWT_KEY,
    {
      expiresIn: "30m",
    }
  );
};

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers["authorization"];

  // Specify routes that don't require a token
  const excludedRoutes = ["/user/login", "/bill/add", "/bill/all"];

  if (!excludedRoutes.includes(req.path)) {
    // Check for the presence of the token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the token
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token is not valid" });
      }
      // Attach the decoded user information to the request object for later use
      req.user = decoded;
      next();
    });
  } else {
    // For excluded routes, proceed without token verification
    next();
  }
};

export { generateToken, verifyToken };
