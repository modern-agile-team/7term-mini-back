"use strict";

import express from "express";
import ctrl from "./authCtrl.js";

const router = express.Router();

router.post("/login", ctrl.process.login);

router.get("/new-access-token", ctrl.process.newAccessToken);

export default router;