"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import user from "./src/routes/user/userRoutes.js";
import auth from "./src/routes/auth/authRoutes.js";
import board from "./src/routes/board/boardRoutes.js";
import mypage from "./src/routes/mypage/mypageRoutes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({extended: true}));

app.use("/users", user);
app.use("/auth", auth);
app.use("/boards", board);
app.use("/mypage", mypage);

export default app;
