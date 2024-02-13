"use strict";

import express from "express";
import ctrl from "./authCtrl.js"


const router = express.Router();

router.post("/register", ctrl.process.createUser);


export default router;

