"use strict";

import express from "express";
import ctrl from "./authCtrl.js";
import authMiddleware from "./authMiddleware.js";
import authValidation from "./authValidation.js";

const router = express.Router();

router.post("/login", authValidation.process.check, ctrl.process.login);

router.get("/new-access-token", ctrl.process.newAccessToken);

router.delete("/logout", authMiddleware.tokenProcess.accessToken, ctrl.process.logout);

export default router;