import express from "express";
import boardCtrl from "./boardCtrl.js";
import boardValidation from "./boardValidation.js";
import middleware from "../auth/authMiddleware.js";
import loveValidation from "./love/loveValidation.js";
import loveCtrl from "./love/loveCtrl.js";
import commentValidation from "./comment/commentValidation.js";
import commentCtrl from "./comment/commentCtrl.js";

const router = express.Router();

//보드 생성
router.post(
  "/",
  middleware.tokenProcess.accessToken,
  boardValidation.checkBeforePost,
  boardCtrl.appendBoard
);

//보드 삭제
router.delete(
  "/:boardNo",
  middleware.tokenProcess.accessToken,
  boardValidation.checkBeforeDelete,
  boardCtrl.deleteBoard
);

//보드 조회
router.get(
  "/:boardNo",
  middleware.tokenProcess.accessToken,
  boardValidation.checkBeforeGet,
  boardCtrl.findOneBoardWithNicknameAndLoveCount
);

//보드 수정
router.put(
  "/:boardNo",
  middleware.tokenProcess.accessToken,
  boardValidation.checkBeforePut,
  boardCtrl.updateBoard
);

//페이지 조회
router.get(
  "/",
  middleware.tokenProcess.accessToken,
  boardValidation.checkBoards,
  boardCtrl.getBoardsAndLoveCountAndCommentCount
);

//좋아요 생성
router.post(
  "/:boardNo/love",
  middleware.tokenProcess.accessToken,
  loveValidation.checkBoardNo,
  loveCtrl.process.addLove
);

//좋아요 삭제
router.delete(
  "/:boardNo/love",
  middleware.tokenProcess.accessToken,
  loveValidation.checkBoardNo,
  loveCtrl.process.deleteLove
);

//댓글 생성
router.post(
  "/:boardNo/comments",
  middleware.tokenProcess.accessToken,
  commentValidation.checkAddComments,
  commentCtrl.process.addComments
);

//댓글 조회
router.get(
  "/:boardNo/comments/:commentPage",
  middleware.tokenProcess.accessToken,
  commentValidation.checkGetComments,
  commentCtrl.process.getComments
);

//댓글 삭제
router.delete(
  "/:boardNo/comments/:no",
  middleware.tokenProcess.accessToken,
  commentValidation.checkDeleteComment,
  commentCtrl.process.deleteComment
);

export default router;
