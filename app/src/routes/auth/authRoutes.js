"use strict";

import express from "express";
import ctrl from "./authCtrl.js"
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    const response = { error: 'Bad Request', message: "토큰이 없습니다.", statusCode: 400 }
    return res.status(response.statusCode).json(response);
  }
  const [type, clientAccessToken] = token.split(' ');
  try {
    let payload = jwt.verify(clientAccessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log('토큰 인증 성공', payload)
    req.user = { ...payload };
    console.log(req.user)
    // res.json({ message: "인증 성공" });
    next();
  } catch (err) {
    console.log("유효하지 않은 토큰입니다.");
    res.status(401).json({ error: 'Unauthorized', message: err.message, });
    next(err)
  }
},
  ctrl.process.login
);
router.post("/access", ctrl.process.access);

router.get("/check", ctrl.output.check);
export default router;