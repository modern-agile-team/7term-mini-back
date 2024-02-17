import express from "express";
import ctrl from "./mainpageCtrl.js";
import validation from "./mainpageValidation.js";
import checkToken from "../auth/authMiddleware.js";

const router = express.Router();

router.get("/", checkToken.tokenProcess.accessToken, ctrl.process.getUser);

router.get(
  "/:currentPageNumber",
  checkToken.tokenProcess.accessToken,
  validation.process.checkBoards,
  ctrl.process.getBoardsAndLoveCountAndCommentCount
);

export default router;
