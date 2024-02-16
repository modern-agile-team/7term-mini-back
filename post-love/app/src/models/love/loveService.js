"use strict";

import LoveRepository from "./loveRepository.js";

class LoveService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }
  async getLove() {
    const userNo = this.body.user_no;
    const boardNo = this.params.board_no;
    let error = await LoveRepository.isBoardNo(boardNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 게시글이 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    error = await LoveRepository.isUserNo(userNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저가 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    const duplication = await LoveRepository.duplication(boardNo, userNo);
    if (!duplication[0][0]) {
      await LoveRepository.getLove(userNo, boardNo);
      return {statuscode: 201};
    } else {
      return {
        error: "Bad Request",
        message: "좋아요는 한 번만 가능합니다.",
        statuscode: 400,
      };
    }
  }
  async deleteLove() {
    const userNo = this.body.user_no;
    const boardNo = this.params.board_no;
    let error = await LoveRepository.isBoardNo(boardNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 게시글이 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    error = await LoveRepository.isUserNo(userNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저가 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    await LoveRepository.deleteLove(userNo, boardNo);
    return {statuscode: 200};
  }
}

export default LoveService;
