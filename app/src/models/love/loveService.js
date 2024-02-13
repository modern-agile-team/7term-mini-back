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
    try {
      const response = await LoveRepository.getLove(userNo, boardNo);
      return response;
    } catch (err) {
      return { msg: err };
    }
  }
  async deleteLove() {
    const userNo = this.body.user_no;
    const boardNo = this.params.board_no;
    try {
      const response = await LoveRepository.deleteLove(userNo, boardNo);
      return response;
    } catch (err) {
      return { msg: err };
    }
  }
}

export default LoveService;
