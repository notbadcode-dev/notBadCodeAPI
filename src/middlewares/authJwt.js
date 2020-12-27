
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../apps/auth/models/User.model';

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decode = jwt.verify(token, config.AUTH.SECRET);
    req.userId = decode.id;
  
    const user = await User.findById(req.userId, {"_id": 1 });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};