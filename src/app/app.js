import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import authRoute from "../routes/auth.routes.js";
import passport from "passport";

const app = express();
app.use(express.json());
app.use(cookieParser());

passport.use(
  new GoogleStrategy(
    {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientsecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (_, __, profile, done) => {
      return done(null, profile);
    },
  ),
);

app.use("/api/auth", authRoute);

export default app;
