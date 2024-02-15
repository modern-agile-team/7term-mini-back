// import {param, header, body, validationResult} from "express-validator";

// export default {
//   process: {
//     getUser: async (req, res) => {
//       console.log(header("user_no"));
//       const error = header("user_no")
//         .notEmpty()
//         .withMessage("유저 고유번호는 비워둘 수 없습니다.")
//         .isInt({min: 1})
//         .withMessage("유저의 고유번호는 자연수여야 합니다.");

//       //   console.log(error);

//       console.log(validationResult(error));
//     },
//   },
// };
