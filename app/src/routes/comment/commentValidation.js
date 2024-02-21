"use stirict";

import {param, body, validationResult} from "express-validator";

export default {
  checkAddComments: async (req, res, next) => {
    await param("board_no", "게시글 번호는 자연수이어야 합니다.")
      .isInt({min: 1})
      .run(req);
    await body("content", "댓글은 1자이상 100자 이하이어야 합니다.")
      .isLength({
        min: 1,
        max: 100,
      })
      .run(req);
    const error = validationResult(req).errors[0];
    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, Statuscode: 400});
    }
    next();
  },
  checkGetComments: async (req, res, next) => {
    await param("board_no", "게시글 고유 번호는 자연수이어야 합니다.")
      .isInt({
        min: 1,
      })
      .run(req);

    const error = validationResult(req).errors[0];
    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, Statuscode: 400});
    }
    next();
  },
  checkDeleteComment: async (req, res, next) => {
    await param("board_no", "게시글 고유 번호는 자연수이어야 합니다.")
      .isInt({
        min: 1,
      })
      .run(req);
    await param("no", "댓글 고유 번호는 자연수이어야 합니다.")
      .isInt({min: 1})
      .run(req);
    const error = validationResult(req).errors[0];
    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, Statuscode: 400});
    }
    next();
  },
};
