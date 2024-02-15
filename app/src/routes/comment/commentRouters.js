"use strict";

import express from "express";
import ctrl from "./commentCtrl.js";
import {param, body} from "express-validator";

const router = express.Router();

router.post(
  "/:board_no",
  param("board_no")
    .notEmpty()
    .withMessage("게시글 번호는 비어있을 수 없습니다.")
    .isInt()
    .withMessage("게시글 번호는 정수이어야 합니다."),
  body("user_no")
    .notEmpty()
    .withMessage("유저 번호는 비어있을 수 없습니다.")
    .isInt()
    .withMessage("유저 번호는 정수이어야 합니다."),
  body("content").notEmpty().withMessage("댓글은 비어있을 수 없습니다."),
  ctrl.process.addComments
);
router.get(
  "/",
  body("board_no")
    .notEmpty()
    .withMessage("게시글 번호는 비어있을 수 없습니다.")
    .isInt()
    .withMessage("게시글 번호는 정수이어야 합니다."),
  ctrl.process.getComments
);
router.delete(
  "/",
  body("no")
    .notEmpty()
    .withMessage("댓글 고유 번호는 비어있을 수 없습니다.")
    .isInt()
    .withMessage("댓글 고유 번호는 정수이어야 합니다."),
  ctrl.process.deleteComments
);

export default router;
