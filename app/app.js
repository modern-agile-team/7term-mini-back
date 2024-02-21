"use strict";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import user from "./src/routes/user/userRoutes.js";
import auth from "./src/routes/auth/authRoutes.js";
import love from "./src/routes/love/loveRouters.js";
import comment from "./src/routes/comment/commentRouters.js";
import main from "./src/routes/mainpage/mainpageRoutes.js";
import board from "./src/routes/board/boardRoutes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ extended: true }));

app.use("/users", user);
app.use("/auth", auth);
app.use("/comment", comment);
app.use("/loves", love);
app.use("/mainpage", main);
app.use("/boards", board);

export default app;
