import { validationResult, body } from "express-validator";

export default {
  process: {
    check: async (req, res, next) => {
      await body("id")
        .notEmpty()
        .withMessage("ID는 빈값이 들어올 수 없습니다.")
        .run(req);

      await body("password")
        .notEmpty()
        .withMessage("패스워드는 빈값이 들어올 수 없습니다.")
        .run(req);

      const error = validationResult(req).errors[0];

      if (error) {
        return res.status(400).json({
          error: "Bad Request",
          message: error.msg,
          statusCode: 400,
        });
      }

      next();
    },
  },
};