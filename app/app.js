"use strict";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

export default app;
