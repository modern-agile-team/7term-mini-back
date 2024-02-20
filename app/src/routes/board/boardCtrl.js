"use strict";
import BoardService from "../../models/board/boardService.js";

export default {
  appendBoard: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.appendBoard();

    res.status(response.statusCode).json(response);
  },

  deleteBoard: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.deleteBoard();

    res.status(response.statusCode).json(response);
  },

  findOneBoardWithNicknameAndLoveCount: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.findOneBoardWithNicknameAndLoveCount();

    res.status(response.statusCode).json(response);
  },

  updateBoard: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.updateBoard();

    res.status(response.statusCode).json(response);
  },
};
