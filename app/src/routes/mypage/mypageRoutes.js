"use strict";

import express from "express";
import ctrl from "./mypageCtrl.js";
import middleware from "../auth/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  middleware.tokenProcess.accessToken,
  ctrl.process.showUserInformation
);

export default router;
