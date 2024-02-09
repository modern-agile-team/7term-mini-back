"use strict";
import BoardService from "../../models/board/boardservice.js";

export default {
  process: {
    createBoard: async (req, res) => {
      // console.log(req.headers);

      const instance = new BoardService(req);
      const response = await instance.appendBoard();

      res.status(response.statusCode).json(response);
    },

    deleteBoard: async (req, res) => {
      const instance = new BoardService(req);
      const response = await instance.deleteBoard();

      res.json(response);
    },

    getBoard: async (req, res) => {
      const instance = new BoardService(req);
      const response = await instance.getBoard();

      response.error
        ? res.status(response.statusCode).json(response)
        : res.status(response.statusCode).json(response.board);
    },

    upadateBoard: async (req, res) => {
      const instace = new BoardService(req);
      const response = await instace.updateBoard();

      res.json(response);
    },
  },
};
