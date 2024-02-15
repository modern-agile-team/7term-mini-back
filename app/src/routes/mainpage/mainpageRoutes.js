import express from "express";
import ctrl from "./mainpageCtrl.js";
import {param, header, body} from "express-validator";

const router = express.Router();

router.get(
  "/",
  header("user_no")
    .notEmpty()
    .withMessage("유저 고유번호는 비워둘 수 없습니다.")
    .isInt({min: 1})
    .withMessage("유저의 고유번호는 자연수여야 합니다."),
  ctrl.process.getUser
);

router.get(
  "/:currentPageNumber",
  param("currentPageNumber")
    .notEmpty()
    .withMessage("현재 페이지 값은 비워둘 수 없습니다.")
    .isInt({min: 1})
    .withMessage("현재 페이지 값은 자연수만 들어가야합니다."),
  body("categoryNo")
    .notEmpty()
    .withMessage("카테고리 번호는 비워둘 수 없습니다.")
    .isInt({min: 1})
    .withMessage("카테고리 번호는 자연수만 들어가야합니다."),
  body("numberBoardsYouWant")
    .notEmpty()
    .withMessage("선택할 페이지는 빈값이면 안됩니다.")
    .isInt({min: 1})
    .withMessage("선택할 페이지는 자연수만 들어가야합니다."),
  ctrl.process.getBoardsAndLoveCountAndCommentCount
);

export default router;
