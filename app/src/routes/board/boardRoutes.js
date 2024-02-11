import express from "express";
import ctrl from "./boardCtrl.js";
import {validationResult, body, check, param, header} from "express-validator";

const router = express.Router();

//보드 생성
router.post(
  "/",
  header("user_no")
    .notEmpty()
    .withMessage("유저 고유번호가 필요합니다.")
    .isInt()
    .withMessage("유저 고유번호는 자연수여야 합니다."),
  body("categoryNo")
    .notEmpty()
    .withMessage("카테고리 번호는 비어둘 수 없습니다.")
    .isInt()
    .withMessage("카테고리 번호는 자연수를 입력해야합니다."),
  body("content")
    .notEmpty()
    .withMessage("내용을 입력해주세요")
    .isLength({max: 250})
    .withMessage("내용은 250자 이내여야 합니다."),
  ctrl.process.appendBoard
);

//보드 삭제
router.delete(
  "/:boardNo",
  param("boardNo")
    .notEmpty()
    .withMessage("삭제할 게시글의 번호가 필요합니다.")
    .isInt()
    .withMessage("삭제할 게시글의 번호는 자연수여야합니다."),
  ctrl.process.deleteBoard
);

//보드 조회
router.get(
  "/:boardNo",
  param("boardNo")
    .notEmpty()
    .withMessage("조회할 게시글의 번호가 필요합니다.")
    .isInt()
    .withMessage("조회할 게시글의 번호는 자연수여야합니다."),
  ctrl.process.findOneBoardWithNicknameAndLoveCount
);

//보드 수정
router.put(
  "/:boardNo",
  param("boardNo")
    .notEmpty()
    .withMessage("조회할 게시글의 번호가 필요합니다.")
    .isInt()
    .withMessage("조회할 게시글의 번호는 자연수여야합니다."),
  body("categoryNo")
    .notEmpty()
    .withMessage("카테고리 번호는 비어둘 수 없습니다.")
    .isInt()
    .withMessage("카테고리 번호는 자연수를 입력해야합니다."),
  body("content")
    .notEmpty()
    .withMessage("내용을 입력해주세요")
    .isLength({max: 250})
    .withMessage("내용은 250자 이내여야 합니다."),
  ctrl.process.updateBoard
);

export default router;
