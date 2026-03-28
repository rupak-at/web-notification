import { validateToken } from "../utils/tokenGeneration.js";

export const verifyToken = (req, res, next) => {
  const token =
    req?.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = validateToken(token);
    req.user = { email: decoded.email, id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
