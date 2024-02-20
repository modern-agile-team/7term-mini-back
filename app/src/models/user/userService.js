"use strict";

import UserStorage from "./userRepository.js";
import bcrypt from "bcrypt";

class User {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
  }

  //validator를 통해 유효성 검사는 앞 단에서 이미 마쳤음, 아래 구문들 라우트단과 확인하며 삭제할것
  async createUser() {
    const clientInfo = this.body;
    if (!clientInfo.nickname) {
      return {
        error: "Bad Request",
        message: "닉네임이 공백입니다.",
        statusCode: 400,
      };
    }
    if (!clientInfo.id) {
      return {
        error: "Bad Request",
        message: "아이디가 공백입니다.",
        statusCode: 400,
      };
    }
    if (!clientInfo.password) {
      return {
        error: "Bad Request",
        message: "비밀번호가 공백입니다.",
        statusCode: 400,
      };
    }
    if (!clientInfo.email) {
      return {
        error: "Bad Request",
        message: "이메일이 공백입니다.",
        statusCode: 400,
      };
    }
    if (clientInfo.nickname.length > 12) {
      return {
        error: "Bad Request",
        message: "닉네임이 12자 이상입니다.",
        statusCode: 400,
      };
    }
    if (clientInfo.id.length > 15) {
      return {
        error: "Bad Request",
        message: "아이디가 15자 이상입니다.",
        statusCode: 400,
      };
    }
    if (clientInfo.email.length > 30) {
      return {
        error: "Bad Request",
        message: "이메일이 30자 이상입니다.",
        statusCode: 400,
      };
    }

    const users = await UserStorage.findUsers(
      clientInfo.id,
      clientInfo.nickname
    );

    for (let i = 0; i < users.length; i++) {
      if (clientInfo.nickname === users[i].nickname) {
        return {
          error: "Conflict",
          message: "닉네임이 중복입니다.",
          statusCode: 409,
        };
      }
      if (clientInfo.id === users[i].id) {
        return {
          error: "Conflict",
          message: "아이디가 중복입니다.",
          statusCode: 409,
        };
      }
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(clientInfo.password, salt);

    try {
      await UserStorage.save(
        clientInfo.nickname,
        clientInfo.id,
        hashPassword,
        clientInfo.email
      );
      return { statusCode: 201, message: "회원가입에 성공하였습니다." };
    } catch (err) {
      return {
        error: "Internal Server Error",
        message: "내부 서버 오류",
        statusCode: 500,
      };
    }
  }
}
export default User;
