"use strict";

import express from "express";
import ctrl from "./authCtrl.js";
import middleware from "./authMiddleware.js";

const router = express.Router();

router.post("/login", middleware.tokenProcess.accessToken, ctrl.process.login); //여기서 미들웨어는 토큰 검증이 되는지 확인하기위해 사용함(로그인할때 액세스토큰 필요x)
router.post("/access", ctrl.process.access);

// router.get("/check", ctrl.output.check);
export default router;
