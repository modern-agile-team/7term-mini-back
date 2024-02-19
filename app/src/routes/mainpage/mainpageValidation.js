import {param, query, validationResult} from "express-validator";

export default {
  checkBoards: async (req, res, next) => {
    await param(
      "currentPageNumber",
      "현재 페이지 값은 자연수가 들어가야합니다."
    )
      .isInt({min: 1})
      .run(req);

    await query("categoryNo", "카테고리 번호는 0, 자연수가 들어가야합니다.")
      .isInt({min: 0})
      .run(req);

    await query("pageSize", "선택할 페이지는 자연수가 들어가야합니다.")
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
