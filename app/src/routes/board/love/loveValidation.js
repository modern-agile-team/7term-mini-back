import {param, validationResult} from "express-validator";

export default {
  checkBoardNo: async (req, res, next) => {
    await param("boardNo", "게시글 고유번호는 자연수이어야 합니다.")
      .isInt({min: 1})
      .run(req);

    const error = validationResult(req).errors[0];

    if (error) {
      return res.status(400).json({
        error: "Bad Request",
        message: error.msg,
        Statuscode: 400,
      });
    }
    next();
  },
};
