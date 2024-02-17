import {body, param, validationResult} from "express-validator";

export default {
  process: {
    checkBeforePost: async (req, res, next) => {
      await body("categoryNo")
        .notEmpty()
        .withMessage("카테고리 번호는 비어둘 수 없습니다.")
        .bail()
        .isInt({min: 1})
        .withMessage("카테고리 번호는 자연수여야 합니다.")
        .run(req);

      await body("content")
        .notEmpty()
        .withMessage("내용을 입력해주세요")
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
        .notEmpty()
        .withMessage("삭제할 게시글의 번호가 필요합니다.")
        .bail()
        .isInt({min: 1})
        .withMessage("삭제할 게시글의 번호는 자연수여야 합니다.")
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
        .notEmpty()
        .withMessage("조회할 게시글의 번호가 필요합니다.")
        .bail()
        .isInt({min: 1})
        .withMessage("조회할 게시글의 번호는 자연수여야 합니다.")
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
        .notEmpty()
        .withMessage("조회할 게시글의 번호가 필요합니다.")
        .bail()
        .isInt({min: 1})
        .withMessage("조회할 게시글의 번호는 자연수여야 합니다.")
        .run(req);

      await body("categoryNo")
        .notEmpty()
        .withMessage("카테고리 번호는 비어둘 수 없습니다.")
        .bail()
        .isInt({min: 1})
        .withMessage("카테고리 번호는 자연수를 입력해야합니다.")
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
  },
};
