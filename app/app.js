"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import love from "./src/routes/love/loveRouters.js"

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({extended: true}));

app.use("/boards/love", love);

export default app;
