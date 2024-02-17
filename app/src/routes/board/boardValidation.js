import {body, param} from "express-validator";

export default {
  process: {
    checkBeforePost: [
      body("categoryNo")
        .notEmpty()
        .withMessage("카테고리 번호는 비어둘 수 없습니다.")
        .isInt({min: 1})
        .withMessage("카테고리 번호는 자연수여야 합니다."),
      body("content")
        .notEmpty()
        .withMessage("내용을 입력해주세요")
        .isLength({max: 250})
        .withMessage("내용은 250자 이내여야 합니다."),
    ],

    checkBeforeDelete: [
      param("boardNo")
        .notEmpty()
        .withMessage("삭제할 게시글의 번호가 필요합니다.")
        .isInt({min: 1})
        .withMessage("삭제할 게시글의 번호는 자연수여야 합니다."),
    ],

    checkBeforeGet: [
      param("boardNo")
        .notEmpty()
        .withMessage("조회할 게시글의 번호가 필요합니다.")
        .isInt({min: 1})
        .withMessage("조회할 게시글의 번호는 자연수여야 합니다."),
    ],

    checkBeforePut: [
      param("boardNo")
        .notEmpty()
        .withMessage("조회할 게시글의 번호가 필요합니다.")
        .isInt({min: 1})
        .withMessage("조회할 게시글의 번호는 자연수여야 합니다."),
      body("categoryNo")
        .notEmpty()
        .withMessage("카테고리 번호는 비어둘 수 없습니다.")
        .isInt({min: 1})
        .withMessage("카테고리 번호는 자연수를 입력해야합니다."),
      body("content")
        .notEmpty()
        .withMessage("내용을 입력해주세요.")
        .isLength({max: 250})
        .withMessage("내용은 250자 이내여야 합니다."),
    ],
  },
};
