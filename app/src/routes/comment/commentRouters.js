"use strict";

import express from "express";
import ctrl from "./commentCtrl.js";
import validation from "./commentValidation.js";
import Middleware from "../auth/authMiddleware.js";

const router = express.Router();

router.post(
  "/:boardNo/comments",
  Middleware.tokenProcess.accessToken,
  validation.checkAddComments,
  ctrl.process.addComments
);

router.get(
  "/:boardNo/comments",
  Middleware.tokenProcess.accessToken,
  validation.checkGetComments,
  ctrl.process.getComments
);

router.delete(
  "/:boardNo/comments/:no",
  Middleware.tokenProcess.accessToken,
  validation.checkDeleteComment,
  ctrl.process.deleteComment
);

export default router;
