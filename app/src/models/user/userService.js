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
    if (!deleteUserResult[0]) {
      return {
        error: "Internal Server Error",
        message: "회원탈퇴에 실패하였습니다.",
        statuscode: 500,
      };
    }
    return {statusCode: 201, message: "회원탈퇴에 성공하였습니다."};
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
      return {statusCode: 201, message: "회원가입에 성공하였습니다."};
    } catch (err) {
      return {
        error: "Internal Server Error",
        message: "내부 서버 오류",
        statusCode: 500,
      };
    }
  }
  async findUserInformation() {
    const userNo = this.user.no;
    const userInformation = await UserRepository.findOneUser(userNo);
    if (!userInformation[0][0]) {
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
export default UserService;
