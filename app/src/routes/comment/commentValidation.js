"use stirict";

import {param, body} from "express-validator";

export default {
  process: {
    checkAddComments: [
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
    ],
    checkGetComments: [
      body("board_no")
        .notEmpty()
        .withMessage("게시글 번호는 비어있을 수 없습니다.")
        .isInt()
        .withMessage("게시글 번호는 정수이어야 합니다."),
    ],
    checkDeleteComments: [
      body("no")
        .notEmpty()
        .withMessage("댓글 고유 번호는 비어있을 수 없습니다.")
        .isInt()
        .withMessage("댓글 고유 번호는 정수이어야 합니다."),
    ],
  },
};
