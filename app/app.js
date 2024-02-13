"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import home from "./src/routes/auth/userRoutes.js"


const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", home);

export default app;
