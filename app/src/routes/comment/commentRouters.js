"use strict";

import express from "express";
import ctrl from "./commentCtrl.js";
import validation from "./commentValidation.js";
import Middleware from "../auth/authMiddleware.js";

const router = express.Router();

router.post(
  "/:board_no",
  Middleware.tokenProcess.accessToken,
  validation.checkAddComments,
  ctrl.process.addComments
);

router.get(
  "/:board_no",
  Middleware.tokenProcess.accessToken,
  validation.checkGetComments,
  ctrl.process.getComments
);

router.delete(
  "/",
  Middleware.tokenProcess.accessToken,
  validation.checkDeleteComments,
  ctrl.process.deleteComments
);

export default router;