import userModel from "../models/user.model";
import sendFiles from "../services/storage.service";
import { generateToken } from "../utils/token";

export const register = async (req, res) => {
  const { username, email, password, dob, fullname, mobile_no } = req.body;

  const file = req.file;

  if (!username || !email || !password)
    return res.status(400).json({
      success: false,
      message: "All fields are Required",
    });

  const uploadImage = null;

  if (file) {
    uploadImage = await sendFiles(file.buffer, file.originalName);
  }

  const user = await userModel.create({
    username,
    email,
    password,
    dob,
    fullname,
    mobile_no,
  });

  accessToken = generateToken(user._id, "10min");
  refreshToken = generateToken(user._id, "1d");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
    secure: false,
    samesite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    samesite: "strict",
  });

  const userData = user.toObject();
  delete userData.password;

  return res.status(201).json({
    success: true,
    message: "User Registered ",
    user: userData,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "All field are Required",
    });

  const user = await userModel.findOne({ email }).select("password");

  if (!user)
    return res.status(400).json({
      success: false,
      message: "user not found",
    });

  if (!user.password || user.authProvider === "google")
    return res.status(400).json({
      success: false,
      message: "Continue with Google",
    });

  const isCorrectPassword = user.comparePass(password);

  if (!isCorrectPassword)
    return res.status(400).json({
      succes: false,
      message: "Invalid Credentials",
    });

  accessToken = generateToken(user._id, "10min");
  refreshToken = generateToken(user._id, "1d");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
    secure: false,
    samesite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    samesite: "strict",
  });

  const userData = user.toObject();
  delete userData.password;

  return res.status(200).json({
    success: true,
    message: "User LoggedIn Successfully",
    user: userData,
  });
};
