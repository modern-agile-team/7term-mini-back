"use strict";

import express from "express";
import ctrl from "./loveCtrl.js";

const router = express.Router();

router.post("/love:id", ctrl.process.getLove);
// router.delete("/love",ctrl.process.DeleteLove);

export default router;
