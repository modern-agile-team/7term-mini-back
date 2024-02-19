import express from "express";
import ctrl from "./boardCtrl.js";
import validation from "./boardValidation.js";
import middleware from "../auth/authMiddleware.js";

const router = express.Router();

//보드 생성
router.post(
  "/",
  middleware.tokenProcess.accessToken,
  validation.checkBeforePost,
  ctrl.appendBoard
);

//보드 삭제
router.delete(
  "/:boardNo",
  middleware.tokenProcess.accessToken,
  validation.checkBeforeDelete,
  ctrl.deleteBoard
);

//보드 조회
router.get(
  "/:boardNo",
  middleware.tokenProcess.accessToken,
  validation.checkBeforeGet,
  ctrl.findOneBoardWithNicknameAndLoveCount
);

//보드 수정
router.put(
  "/:boardNo",
  middleware.tokenProcess.accessToken,
  validation.checkBeforePut,
  ctrl.updateBoard
);

export default router;
