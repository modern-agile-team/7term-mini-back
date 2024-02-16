import {param, body} from "express-validator";

export default {
  process: {
    boardNo_userNocheck: [
      param("board_no")
        .notEmpty()
        .withMessage("게시글 고유 번호는 비어있을 수 없습니다.")
        .isInt()
        .withMessage("게시글 고유 번호는 정수이이어 합니다."),
      body("user_no")
        .notEmpty()
        .withMessage("유저 고유 번호는 비어있을 수 없습니다.")
        .isInt()
        .withMessage("유저 고유 번호는 정수이어야 합니다."),
    ],
  },
};
