"use strict";

import express from "express";
import ctrl from "./commentCtrl.js";
import validation from "./commentValidation.js";
import Middleware from "../auth/authMiddleware.js";

const router = express.Router();

router.post(
  "/:board_no/comments",
  Middleware.tokenProcess.accessToken,
  validation.checkAddComments,
  ctrl.process.addComments
);

router.get(
  "/:board_no/comments",
  Middleware.tokenProcess.accessToken,
  validation.checkGetComments,
  ctrl.process.getComments
);

router.delete(
  "/:board_no/comments/:no",
  Middleware.tokenProcess.accessToken,
  validation.checkDeleteComment,
  ctrl.process.deleteComment
);

export default router;
