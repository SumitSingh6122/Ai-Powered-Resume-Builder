// AuthMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Read the token from the cookie

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id; // Pass the userId to the request object
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
