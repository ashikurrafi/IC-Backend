const User = require("../models/userModel");
const asyncHandler = require("../error/asyncHandler");
const apiError = require("../error/apiError");
const apiResponse = require("../error/apiResponse");
const jwt = require("jsonwebtoken");

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new apiError(400, "User already exists");
    }
    const user = new User({ username, email, password, role });
    await user.save();
    const response = new apiResponse(201, user, "User registered successfully");
    res.status(201).json(response);
  } catch (error) {
    throw new apiError(500, "Error registering user");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(404, "User not found");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new apiError(400, "Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    throw new apiError(500, "Error logging in");
  }
});

module.exports = {
  userRegister,
  userLogin,
};
