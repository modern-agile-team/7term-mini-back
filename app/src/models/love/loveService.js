"use strict";

import LoveRepository from "./loveRepository.js";

class LoveService {
  constructor(req) {
    this.user = req.user;
    this.params = req.params;
  }
  async addLove() {
    const userNo = this.user.no;
    const boardNo = this.params.board_no;
    const loveNoAndUserNo = await LoveRepository.selectLoveNoAndUserNo(
      boardNo,
      userNo
    );
    const error = await LoveRepository.isUserNo(userNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저가 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    if (!loveNoAndUserNo[0][0]) {
      await LoveRepository.addLove(userNo, boardNo);
      return {statuscode: 201};
    } else {
      return {
        error: "Conflict",
        message: "좋아요는 한 번만 가능합니다.",
        statuscode: 409,
      };
    }
  }
  async deleteLove() {
    const userNo = this.user.no;
    const boardNo = this.params.board_no;
    const loveNoAndUserNo = await LoveRepository.selectLoveNoAndUserNo(
      boardNo,
      userNo
    );
    const error = await LoveRepository.isUserNo(userNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저가 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    if (!loveNoAndUserNo[0][0]) {
      return {
        error: "Not Found",
        message: "해당 좋아요가 존재하지 않습니다.",
        statuscode: 404,
      };
    }

    if (userNo !== loveNoAndUserNo[0][0].user_no) {
      return {
        error: "Forbidden",
        message: "좋아요 삭제는 본인만 가능합니다.",
        statuscode: 403,
      };
    }
    const deleteResult = await LoveRepository.deleteLove(userNo, boardNo);
    if (deleteResult[0].affectedRows === 1) {
      return {statuscode: 204};
    } else {
      return {
        error: "Internal Server Error",
        message: "삭제 처리가 되지 않았습니다.",
        statuscode: 500,
      };
    }
  }
}

export default LoveService;
