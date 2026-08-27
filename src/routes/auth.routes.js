import express from "express";
import upload from "../config/multer.config.js";
import {
  forgetPassword,
  googleAuth,
  login,
  logout,
  register,
  resetPassword,
  verifyOtp,
} from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);

router.post(
  "google",
  passport.authenticate("google", { scope: ["Profile", "email"] }),
); //is line ka matlab samjhna h

router.post(
  "google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleAuth,
); //line samjh nhi aayi

router.post("/logout", logout);

router.post("/forget-password", forgetPassword);
router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

export default router;
