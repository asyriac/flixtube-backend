const User = require("../models/user.model");
const { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Playlist } = require("../models/playlist.model");

const maxAge = 60 * 60 * 24 * 3;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const setTokenToCookie = (id, res) => {
  const token = createToken(id);
  res.cookie("accessToken", token, {
    httpOnly: true,
    maxAge: maxAge * 1000,
    sameSite: "none",
    secure: true,
  });
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const result = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    await Playlist.create({ user: result._id });

    result.password = undefined;
    setTokenToCookie(result.id, res);
    return res.json({
      result,
    });
  } catch (err) {
    return res.json({
      err,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const isAuthenticated = await compare(password, user.password);
    if (isAuthenticated) {
      setTokenToCookie(user.id, res);
      user.password = undefined;
      return res.json({
        result: user,
      });
    }
  }
  return res.status(401).json({
    message: "Invalid username or password",
  });
};

const protectedRoute = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ message: "Unauthroized" });
      }
      req.decodedToken = decodedToken;
      next();
    });
  } else {
    return res.status(400).json({ message: "Unauthorized" });
  }
};

const logoutUser = (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    maxAge: maxAge * 1000,
    sameSite: "none",
    secure: true,
  });
  return res.json({
    message: "Logged out successfully",
  });
};

const currentUser = async (req, res) => {
  const userId = req.decodedToken.id;
  const user = await User.findById(userId);

  return res.status(200).json({
    user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  protectedRoute,
  logoutUser,
  currentUser,
};
