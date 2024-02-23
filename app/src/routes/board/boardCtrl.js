"use strict";
import BoardService from "../../models/board/boardService.js";

export default {
  appendBoard: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.appendBoard();

    return res.status(response.statusCode).json(response);
  },

  deleteBoard: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.deleteBoard();

    return res.status(response.statusCode).json(response);
  },

  findOneBoardWithNicknameAndLoveCount: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.findOneBoardWithNicknameAndLoveCount();

    return res.status(response.statusCode).json(response);
  },

  updateBoard: async (req, res) => {
    const boardService = new BoardService(req);
    const response = await boardService.updateBoard();

    return res.status(response.statusCode).json(response);
  },

  getBoardsAndLoveCountAndCommentCount: async (req, res) => {
    const boardService = new BoardService(req);

    const response = await boardService.getBoardsAndLoveCountAndCommentCount();

    return res.status(response.statusCode).json(response);
  },
};
