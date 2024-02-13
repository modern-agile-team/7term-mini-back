"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use("/mainpage", board);

export default app;
