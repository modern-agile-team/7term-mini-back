"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import auth from "./src/routes/auth/authRoutes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ extended: true }));
app.use("/auth", auth);

export default app;
