import express from "express";
import ctrl from "./boardCtrl.js";

const router = express.Router();

//보드 생성
router.post("/", ctrl.process.createBoard);

//보드 삭제
router.delete("/:boardNo", ctrl.process.deleteBoard);

//보드 조회
router.get("/:boardNo", ctrl.process.getBoard);

//보드 수정
router.put("/:boardNo", ctrl.process.upadateBoard);

export default router;
