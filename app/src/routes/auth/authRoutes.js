"use strict";

import express from "express";
import ctrl from "./authCtrl.js"


const router = express.Router();

router.post("/login", ctrl.process.login);
router.post("/access", ctrl.process.access);

export default router;