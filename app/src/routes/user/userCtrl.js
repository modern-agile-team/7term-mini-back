"use strict";

import User from "../../models/user/userService.js";
import {validationResult} from "express-validator";

const process = {
  createUser: async (req, res) => {
    console.log(validationResult(req).errors);
    const error = validationResult(req).errors;

    if (error[0]) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error[0].msg, statusCode: 400});
    }

    const user = new User(req);
    const response = await user.createUser();

    return res.status(response.statusCode).json(response);
  },
};
export default {
  process,
};
