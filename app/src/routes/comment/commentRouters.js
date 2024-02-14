"use strict";

import express from "express";
import ctrl from "./commentCtrl.js";

const router = express.Router();

router.post("/:board_no", ctrl.process.addComments);
router.delete("/",ctrl.process.deleteComments);

export default router;