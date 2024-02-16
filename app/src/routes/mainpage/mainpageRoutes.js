import express from "express";
import ctrl from "./mainpageCtrl.js";
import validation from "./mainpageValidation.js";

const router = express.Router();

router.get("/", validation.process.checkUserNo, ctrl.process.getUser);

router.get(
  "/:currentPageNumber",
  validation.process.checkBoards,
  ctrl.process.getBoardsAndLoveCountAndCommentCount
);

export default router;
