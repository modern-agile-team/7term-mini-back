"use strict";

import UserRepository from "../user/userRepository.js";

class MypageService {
  constructor(req) {
    this.user = req.user;
  }

  async showUserInformation() {
    const userNo = this.user.no;
    const error = await UserRepository.findOneUser(userNo);
    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저가 존재하지 않습니다.",
        statuscode: 404,
      };
    }
    const [rows, field] = await UserRepository.findOneUser(userNo);

    return {
      statuscode: 200,
      nickname: rows[0].nickname,
      email: rows[0].email,
      created_at: rows[0].created_at,
    };
  }
}

export default MypageService;
