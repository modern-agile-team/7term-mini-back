import MainpageService from "../../models/mainpage/mainpageService.js";
import {validationResult} from "express-validator";

export default {
  process: {
    getUser: async (req, res) => {
      const instance = new MainpageService(req);

      const response = await instance.getUserName();

      res.status(response.statusCode).json(response);
    },

    getBoardsAndLoveCountAndCommentCount: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        return res
          .status(400)
          .json({error: "Bad Request", messgae: error.msg, statusCode: 400});
      }

      const instance = new MainpageService(req);

      const response = await instance.getBoardsAndLoveCountAndCommentCount();

      res.status(response.statusCode).json(response);
    },
  },
};
