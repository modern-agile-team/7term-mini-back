"use strict";

import express from "express";
import ctrl from "./userCtrl.js";
import validation from "./userValidation.js";
import checkToken from "../auth/authMiddleware.js";

const router = express.Router();

//조건들은 변경될수도 있음
router.post("/sign-up", validation.process.check, ctrl.process.createUser);
router.delete("/delete-users", checkToken.tokenProcess.accessToken, ctrl.process.deleteUser);

export default router;
