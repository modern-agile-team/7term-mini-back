"use strict";

import express from "express";
import ctrl from "./loveCtrl.js";
import validation from "./loveValidation.js";
import Middleware from "../auth/authMiddleware.js";

const router = express.Router();

router.post(
  "/love/:board_no",
  Middleware.tokenProcess.accessToken,
  ctrl.process.addLove
);
router.delete(
  "/love/:board_no",
  Middleware.tokenProcess.accessToken,
  validation.checkBoardNo,
  ctrl.process.deleteLove
);

export default router;
