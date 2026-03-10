const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { constants } = require("../middlewares/constants");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Username and password are required");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ 
      success: true, 
      data: { username: newUser.username },
      message: `User registered with username ${username}` 
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Username and password are required");
    }
    
    const user = await User.findOne({ username });
    if (!user) {
      res.status(constants.NOT_FOUND);
      throw new Error(`${username} not found`);
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Invalid Credentials");
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ 
      success: true, 
      data: { token }, 
      message: "Login successful" 
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };