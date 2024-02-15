"use strict";

import CommentRepository from "./commnetRepository.js";

class CommentService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }
  async addComments() {
    const boardNo = this.params.board_no;
    const userNo = this.body.user_no;
    const comments = this.body.content;
    try {
      const response = await CommentRepository.addComments(
        boardNo,
        userNo,
        comments
      );
      return response;
    } catch (err) {
      return {success: false};
    }
  }
  async deleteComments() {
    const No = this.body.no;
    try {
      const response = await CommentRepository.deleteComments(No);
      return response;
    } catch (err) {
      return {success: false};
    }
  }
  async getComments() {
    const boardNo = this.body.board_no;
    try {
      const [rows, fields] = await CommentRepository.getComments(boardNo);
      return rows;
    } catch {
      return {success: false};
    }
  }
}

export default CommentService;
