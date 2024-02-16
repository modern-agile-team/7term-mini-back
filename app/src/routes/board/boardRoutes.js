import express from "express";
import ctrl from "./boardCtrl.js";
import {body, param, header} from "express-validator";
import validation from "./boardValidation.js";

const router = express.Router();

//보드 생성
router.post("/", validation.process.checkBeforePost, ctrl.process.appendBoard);

//보드 삭제
router.delete(
  "/:boardNo",
  validation.process.checkBeforeDelete,
  ctrl.process.deleteBoard
);

//보드 조회
router.get(
  "/:boardNo",
  validation.process.checkBeforeGet,
  ctrl.process.findOneBoardWithNicknameAndLoveCount
);

//보드 수정
router.put(
  "/:boardNo",
  validation.process.checkBeforePut,
  ctrl.process.updateBoard
);

export default router;
