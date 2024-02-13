"use strict";

import express from "express";
import ctrl from "./loveCtrl.js";

const router = express.Router();

router.post("/love/:board_no", ctrl.process.getLove);
router.delete("/love/:board_no", ctrl.process.deleteLove);

export default router;
