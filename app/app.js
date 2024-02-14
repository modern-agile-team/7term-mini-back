"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import main from "./src/routes/mainpage/mainpageRoutes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({extended: true}));

app.use("/mainpage", main);

export default app;
