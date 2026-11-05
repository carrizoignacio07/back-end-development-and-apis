import { verifyToken } from "../utils/jwt.js";
import { isBlacklisted } from "../utils/token-blacklist.js";

export default function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({
      message: "Token has been invalidated. Log in again.",
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  req.user = decoded;
  next();
}