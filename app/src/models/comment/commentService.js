"use strict";

import CommentRepository from "./commnetRepository.js";
import BoardRepository from "../board/boardRepository.js";
class CommentService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.user = req.user;
  }
  async addComments() {
    const boardNo = this.params.boardNo;
    const userNo = this.user.no;
    const comments = this.body.content;

    let error = await BoardRepository.checkBoardNo(boardNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 게시글이 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    error = await CommentRepository.checkUserNo(userNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저가 존재하지 않습니다.",
        statuscode: 404,
      };
    }

    const response = await CommentRepository.addComments(
      boardNo,
      userNo,
      comments
    );
    const [rows, fields] = await CommentRepository.showContent(
      response[0].insertId
    );

    return {statuscode: 201, rows: rows[0]};
  }

  async deleteComment() {
    const commentNo = this.params.no;
    const userNo = this.user.no;

    let error = await CommentRepository.checkCommentNo(commentNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 댓글이 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    const checkCommentOwner = await CommentRepository.checkCommentOwner(
      userNo,
      commentNo
    );
    if (!checkCommentOwner[0][0]) {
      return {
        error: "Forbidden",
        message: "댓글은 본인만 삭제 가능합니다.",
        statuscode: 403,
      };
    }

    const deleteResult = await CommentRepository.deleteComment(commentNo);
    if (!deleteResult[0].affectedRows) {
      return {
        error: "Internal Server Error",
        message: "삭제가 되지 않았습니다.",
        statuscode: 500,
      };
    }

    return {message: "댓글이 성공적으로 삭제됐습니다.", statuscode: 200};
  }

  async getComments() {
    const boardNo = this.params.boardNo;
    let error = await BoardRepository.checkBoardNo(boardNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 게시글이 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    const [rows, fields] = await CommentRepository.getComments(boardNo);
    return {statuscode: 200, rows};
  }
}

export default CommentService;
