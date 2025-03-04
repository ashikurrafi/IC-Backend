const User = require("../models/userModel");
const asyncHandler = require("../error/asyncHandler");
const apiError = require("../error/apiError");
const apiResponse = require("../error/apiResponse");
const jwt = require("jsonwebtoken");

// Register a new user
const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new apiError(400, "User already exists");
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new apiError(
      400,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
  const user = new User({ username, email, password, role });
  await user.save();
  const response = new apiResponse(201, user, "User registered successfully");
  res.status(201).json(response);
});

// Login a user
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new apiError(400, "All fields are required");
  }
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
});

module.exports = {
  userRegister,
  userLogin,
};
