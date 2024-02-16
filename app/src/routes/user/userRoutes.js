"use strict";

import express from "express";
import ctrl from "./userCtrl.js";
import validation from "./userValidation.js";

const router = express.Router();

//조건들은 변경될수도 있음
router.post("/users", validation.process.check, ctrl.process.createUser);

export default router;
