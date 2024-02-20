"use strict";

import express from "express";
import ctrl from "./authCtrl.js";
import authMiddleware from "./authMiddleware.js";

const router = express.Router();

router.post("/login", ctrl.process.login);

router.get("/new-accesstoken", ctrl.process.newAccessToken);

router.delete("/logout", authMiddleware.tokenProcess.accessToken, ctrl.process.logout);

export default router;