"use strict";

import UserRepository from "./userRepository.js";
import bcrypt from "bcrypt";

class UserService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.user = req.user;
  }

  async deleteUser() {
    const clientInfo = this.user;
    const deleteUserResult = await UserRepository.delete(clientInfo.no);
    console.log(deleteUserResult[0])
    if (!deleteUserResult[0]) {
      return { error: "Internal Server Error", message: "회원탈퇴에 실패하였습니다.", statuscode: 500 };
    }
    return { statusCode: 201, message: "회원탈퇴에 성공하였습니다." };
  }

  async createUser() {
    const clientInfo = this.body;

    const users = await UserRepository.findUsers(
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
      await UserRepository.save(
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
export default UserService;
