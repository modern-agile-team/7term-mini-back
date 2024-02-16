"use strict";

import express from "express";
import ctrl from "./commentCtrl.js";
import validation from "./commentValidation.js";

const router = express.Router();

router.post(
  "/:board_no",
  validation.process.checkAddComments,
  ctrl.process.addComments
);
router.get("/", validation.process.checkGetComments, ctrl.process.getComments);
router.delete(
  "/",
  validation.process.checkDeleteComments,
  ctrl.process.deleteComments
);

export default router;
