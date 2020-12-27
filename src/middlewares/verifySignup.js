import User from "../apps/auth/models/User.model";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const email = await User.findOne({ email: req.body.email });
    if (email) {
        return res.status(400).json({ message: "Email already exists" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const existUsernameOrEmail = async (req, res, next) => {
    const { userName, email } = req.body;
    try {
        if (email) {
            const emailFound = await User.findOne({ email: email });
            if (!emailFound) {
                return res.status(400).json({ message: "Email not found" });
            }
        } else if (userName) {
            const userFound = await User.findOne({ username: userName });
            if (!userFound) {
                return res.status(400).json({ message: "Username not found" });
            }
        } else {
            res.status(500).json({ message: error | 'Something goes wrong signin' });
        }
  
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };