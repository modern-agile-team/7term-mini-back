"use strict";
import BoardService from "../../models/board/boardservice.js";
import {validationResult} from "express-validator";

export default {
  process: {
    appendBoard: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});

        return 0;
      }

      const instance = new BoardService(req);
      const response = await instance.appendBoard();

      res.status(response.statusCode).json(response);
    },

    deleteBoard: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});

        return 0;
      }

      const instance = new BoardService(req);
      const response = await instance.deleteBoard();

      res.statusCode(response.statusCode).json(response);
    },

    findOneBoardWithNicknameAndLoveCount: async (req, res) => {
      // console.log(validationResult(req));

      const error = validationResult(req).errors[0];

      if (error) {
        res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});

        return 0;
      }

      const instance = new BoardService(req);
      const response = await instance.findOneBoardWithNicknameAndLoveCount();

      response.error
        ? res.status(response.statusCode).json(response)
        : res.status(response.statusCode).json(response.board);
    },

    updateBoard: async (req, res) => {
      const error = validationResult(req).errors[0];

      if (error) {
        res
          .status(400)
          .json({error: "Bad Request", message: error.msg, statusCode: 400});

        return 0;
      }

      const instace = new BoardService(req);
      const response = await instace.updateBoard();

      res.status(response.statusCode).json(response);
    },
  },
  // check: {
  //   checkBoardNo: (req, res) => {
  //     body("category").isEmpty();
  //   },
  // },
};