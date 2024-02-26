"use strict";

import express from "express";
import ctrl from "./userCtrl.js";
import validation from "./userValidation.js";
import checkToken from "../auth/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", validation.process.check, ctrl.process.createUser);
router.delete(
  "/delete-users",
  checkToken.tokenProcess.accessToken,
  ctrl.process.deleteUser
);
router.get(
  "/mypage",
  checkToken.tokenProcess.accessToken,
  ctrl.process.findUserInformation
);

export default router;
