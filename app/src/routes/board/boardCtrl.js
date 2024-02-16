"use strict";
import BoardService from "../../models/board/boardservice.js";
import {validationResult} from "express-validator";

export default {
  process: {
    appendBoard: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        return res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});
      }

      const instance = new BoardService(req);
      const response = await instance.appendBoard();

      res.status(response.statusCode).json(response);
    },

    deleteBoard: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        return res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});
      }

      const instance = new BoardService(req);
      const response = await instance.deleteBoard();

      res.status(response.statusCode).json(response);
    },

    findOneBoardWithNicknameAndLoveCount: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        return res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});
      }

      const instance = new BoardService(req);
      const response = await instance.findOneBoardWithNicknameAndLoveCount();

      res.status(response.statusCode).json(response);

      // response.error
      //   ? res.status(response.statusCode).json(response)
      //   : res.status(response.statusCode).json(response.board);
    },

    updateBoard: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        return res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});
      }

      const instace = new BoardService(req);
      const response = await instace.updateBoard();

      res.status(response.statusCode).json(response);
    },
  },
};
