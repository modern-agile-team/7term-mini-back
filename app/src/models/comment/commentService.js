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

    let error = await CommentRepository.isBoardNO(boardNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 게시글이 존재하지 않습니다.",
        Statuscode: 404,
      };
    }
    error = await CommentRepository.isUserNO(userNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저가 존재하지 않습니다.",
        Statuscode: 404,
      };
    }

    const response = await CommentRepository.addComments(
      boardNo,
      userNo,
      comments
    );
    const [rows, fields] = await CommentRepository.showComment(
      response[0].insertId
    );

    return {Statuscode: 201, rows: rows[0]};
  }
  async deleteComments() {
    const No = this.body.no;
    let error = await CommentRepository.isNO(No);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 댓글이 존재하지 않습니다.",
        Statuscode: 404,
      };
    }
    await CommentRepository.deleteComments(No);
    return {message: "댓글이 성공적으로 삭제됐습니다.", Statuscode: 200};
  }
  async getComments() {
    const boardNo = this.body.board_no;
    let error = await CommentRepository.isBoardNO(boardNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 게시글이 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    const [rows, fields] = await CommentRepository.getComments(boardNo);
    return {Statuscode: 200, rows};
  }
}

export default CommentService;
