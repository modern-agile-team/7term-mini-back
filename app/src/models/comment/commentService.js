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
      return { err: msg };
    }
  }
  async deleteComments() {
    const No = this.body.no;
    try {
        const response = await CommentRepository.deleteComments(No);
        return response;
    }
    catch(err) {
        return {err : msg};
    }
  }
}

export default CommentService;
