
import jwt from 'jsonwebtoken';
import cryptoJS from 'crypto-js';
import config from '../config';

import User from '../apps/auth/models/User.model';
import App from '../apps/auth/models/App.model';

export const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"].split(' ')[1];

  if (!token) return res.status(403).json({ message: "No token provided" });
  token = token.split(' ')[1];

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

export const veriryAppToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });
  token = token.split(' ')[1];

  try {
    // DECRYPTED
    const decrypted = cryptoJS.AES.decrypt(token, config.AUTH_APP.SECRET);
    // GET ORIGINAL TEXT
    const original = decrypted.toString(cryptoJS.enc.Utf8);

    const decode = jwt.verify(original, config.AUTH.SECRET);
    req.userId = decode.id;
  
    const user = await App.findById(req.userId, {"_id": 1 });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};