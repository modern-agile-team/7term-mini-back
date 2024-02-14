"use strict";

import express from "express";
import ctrl from "./userCtrl.js"


const router = express.Router();

router.post("/users", ctrl.process.createUser);


export default router;

