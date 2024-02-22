import {query, body, param, validationResult} from "express-validator";

export default {
  checkBeforePost: async (req, res, next) => {
    await body("categoryNo")
      .isInt({min: 1})
      .withMessage("카테고리 번호가 들어가야 합니다.")
      .run(req);

    await body("content")
      .notEmpty()
      .withMessage("내용을 입력해야합니다.")
      .bail()
      .isLength({max: 250})
      .withMessage("내용은 250자 이내여야 합니다.")
      .run(req);

    const error = validationResult(req).errors[0];

    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, statusCode: 400});
    }

    next();
  },

  checkBeforeDelete: async (req, res, next) => {
    await param("boardNo")
      .isInt({min: 1})
      .withMessage("삭제할 게시글의 번호는 자연수가 들어가야 합니다.")
      .run(req);

    const error = validationResult(req).errors[0];

    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, statusCode: 400});
    }

    next();
  },

  checkBeforeGet: async (req, res, next) => {
    await param("boardNo")
      .isInt({min: 1})
      .withMessage("조회할 게시글의 번호는 자연수가 들어가야 합니다.")
      .run(req);

    const error = validationResult(req).errors[0];

    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, statusCode: 400});
    }

    next();
  },

  checkBeforePut: async (req, res, next) => {
    await param("boardNo")
      .isInt({min: 1})
      .withMessage("수정할 게시글의 번호는 자연수가 들어가야 합니다.")
      .run(req);

    await body("categoryNo")
      .isInt({min: 1})
      .withMessage("수정할 카테고리 번호는 자연수를 입력해야합니다.")
      .run(req);

    await body("content")
      .notEmpty()
      .withMessage("내용을 입력해주세요.")
      .bail()
      .isLength({max: 250})
      .withMessage("내용은 250자 이내여야 합니다.")
      .run(req);

    const error = validationResult(req).errors[0];

    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, statusCode: 400});
    }

    next();
  },
  checkBoards: async (req, res, next) => {
    await query("currentPage", "현재 페이지 값은 자연수가 들어가야합니다.")
      .isInt({min: 1})
      .run(req);

    await query(
      "categoryNo",
      "카테고리 번호는 0(전체), 자연수가 들어가야합니다."
    )
      .isInt({min: 0})
      .run(req);

    await query("pageSize", "선택할 페이지 개수는 자연수가 들어가야합니다.")
      .isInt({min: 1})
      .run(req);

    const error = validationResult(req).errors[0];

    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, statusCode: 400});
    }

    next();
  },
};
