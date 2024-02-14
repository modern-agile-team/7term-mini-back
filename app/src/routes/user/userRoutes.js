"use strict";

import express from "express";
import ctrl from "./userCtrl.js";
import {body} from "express-validator";

const router = express.Router();

//조건들은 변경될수도 있음
router.post(
  "/users",
  body("id")
    .notEmpty()
    .withMessage("ID는 빈값이 들어올 수 없습니다.")
    .isAlphanumeric()
    .withMessage("ID는 알파벳, 숫자만 사용할 수 있습니다.")
    .isLength({max: 15})
    .withMessage("아이디는 15자 이하여야만 가능합니다."),
  body("nickname")
    .notEmpty()
    .withMessage("닉네임은 빈값이 들어올 수 없습니다.")
    .isLength({max: 12})
    .withMessage("닉네임은 12자 이하여야만 가능합니다."),
  body("password")
    .notEmpty()
    .withMessage("패스워드는 빈값이 들어올 수 없습니다.")
    .isLength({max: 20})
    .withMessage("패스워드는 20자 이하여야만 가능합니다."),
  body("email")
    .notEmpty()
    .withMessage("이메일은 빈값이 들어올 수 없습니다.")
    .isEmail({allow_utf8_local_part: false})
    .withMessage("적절한 이메일 형식이 아닙니다.")
    .isLength({max: 30})
    .withMessage("이메일은 30자 이하여야만 가능합니다."),
  ctrl.process.createUser
);

export default router;
