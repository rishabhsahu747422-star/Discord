import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

import app from "./src/app/app.js";
import { connectDb } from "./src/config/db.js";
connectDb();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
