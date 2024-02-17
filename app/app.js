"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import board from "./src/routes/board/boardRoutes.js";
import home from "./src/routes/auth/authRoutes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({extended: true}));

app.use("/", home);
app.use("/boards", board);

export default app;
