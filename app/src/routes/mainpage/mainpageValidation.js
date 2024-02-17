import {param, query, validationResult} from "express-validator";

export default {
  process: {
    checkBoards: async (req, res, next) => {
      await param("currentPageNumber")
        .notEmpty()
        .withMessage("현재 페이지 값은 비워둘 수 없습니다.")
        .isInt({min: 1})
        .withMessage("현재 페이지 값은 자연수만 들어가야합니다.")
        .run(req);

      await query("categoryNo")
        .notEmpty()
        .withMessage("카테고리 번호는 비워둘 수 없습니다.")
        .isInt({min: 0})
        .withMessage("카테고리 번호는 0, 자연수만 들어가야합니다.")
        .run(req);

      await query("numberBoardsYouWant")
        .notEmpty()
        .withMessage("선택할 페이지는 빈값이면 안됩니다.")
        .isInt({min: 1})
        .withMessage("선택할 페이지는 자연수만 들어가야합니다.")
        .run(req);

      const error = validationResult(req).errors[0];

      if (error) {
        return res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});
      }

      next();
    },
  },
};
