"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import user from "./src/routes/user/userRoutes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ extended: true }));

app.use("/auth", user);

export default app;
