import {validationResult, body} from "express-validator";

export default {
  process: {
    check: async (req, res, next) => {
      await body("id")
        .notEmpty()
        .withMessage("ID는 빈값이 들어올 수 없습니다.")
        .bail()
        .isAlphanumeric()
        .withMessage(
          "ID는 알파벳, 숫자만 사용할 수 있습니다. 공백은 허용되지 않습니다."
        )
        .bail()
        .isLength({min: 3, max: 15})
        .withMessage("아이디는 3자 이상 15자 이하여야만 가능합니다.")
        .run(req);

      await body("nickname")
        .notEmpty()
        .withMessage("닉네임은 빈값이 들어올 수 없습니다.")
        .bail()
        .isLength({max: 5})
        .withMessage("닉네임은 5자 이하여야만 가능합니다.")
        .bail()
        .matches(/^[ㄱ-힣a-zA-Z0-9]+$/) //이 부분은 바뀔 가능성 농후
        .withMessage(
          "닉네임은 한글, 영어, 숫자로만 이루어져야 합니다. 공백은 허용되지 않습니다."
        )
        .run(req);

      await body("password")
        .notEmpty()
        .withMessage("패스워드는 빈값이 들어올 수 없습니다.")
        .bail()
        .isLength({max: 20})
        .withMessage("패스워드는 20자 이하여야만 가능합니다.")
        .run(req);

      await body("email")
        .notEmpty()
        .withMessage("이메일은 빈값이 들어올 수 없습니다.")
        .bail()
        .isEmail({allow_utf8_local_part: false})
        .withMessage(
          "이메일은 숫자와 영어만 허용돱니다.(ex:abcd1234@naver.com)"
        )
        .bail()
        .isLength({max: 30})
        .withMessage("이메일은 30자 이하여야만 가능합니다.")
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
