"use strict";

import express from "express";
import ctrl from "./loveCtrl.js";
import validation from "./loveValidation.js";

const router = express.Router();

router.post(
  "/love/:board_no",
  validation.process.boardNo_userNocheck,
  ctrl.process.getLove
);
router.delete(
  "/love/:board_no",
  validation.process.boardNo_userNocheck,
  ctrl.process.deleteLove
);

export default router;
