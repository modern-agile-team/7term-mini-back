"use strict";

import AuthRepository from "./authRepository.js";
import UserRepository from "../user/userRepository.js";
import JwtService from "./jwtService.js";
import bcrypt from "bcrypt";

class AuthService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.headers = req.headers;
    this.user = req.user;
  }
  async checkAccessToken() {
    const accessToken = this.user;

    const [users, field] = await AuthRepository.findAccessToken(accessToken.no);
    if (!users[0]) {
      return {
        error: "Not Found",
        message: "유저의 액세스 토큰 정보가 없습니다.",
        statusCode: 404,
      };
    }
    return {
      statusCode: 201,
      message: "정상적인 액세스 토큰입니다.",
    };
  }

  async logout() {
    const accessToken = this.user;
    const logoutResult = await AuthRepository.deleteRefreshToken(
      accessToken.no
    );
    if (!logoutResult[0].affectedRows) {
      return {
        error: "Internal Server Error",
        message: "로그아웃에 실패하였습니다.",
        statuscode: 500,
      };
    }
    return { statusCode: 201, message: "로그아웃에 성공하였습니다." };
  }

  async login() {
    const loginRequestBody = this.body;

    const [users, field] = await UserRepository.getUser(loginRequestBody.id);
    if (!users[0]) {
      return {
        error: "Not Found",
        message: "아이디가 틀렸습니다.",
        statusCode: 404,
      };
    }

    const match = await bcrypt.compare(
      loginRequestBody.password,
      users[0].password
    );

    if (!match) {
      return {
        error: "Not Found",
        message: "패스워드가 틀렸습니다.",
        statusCode: 404,
      };
    }

    const accessToken = JwtService.createAccessToken({
      id: users[0].id,
      no: users[0].no,
    });
    const refreshToken = JwtService.createRefreshToken({
      id: users[0].id,
      no: users[0].no,
    });

    await AuthRepository.tokenSave(users[0].no, refreshToken, accessToken);

    return {
      message: "로그인에 성공하였습니다.",
      accessToken,
      refreshToken,
      userNickName: users[0].nickname,
      statusCode: 201,
    };
  }

  async newAccessToken() {
    const authorization = this.headers["authorization"];

    if (!authorization) {
      return {
        error: "Bad Request",
        message: "토큰이 없습니다.",
        statusCode: 400,
      };
    }

    const [type, clientRefreshToken] = authorization.split(" ");
    if (type !== "Bearer") {
      return {
        error: "Bad Request",
        message: "잘못된 토큰 타입입니다.",
        statusCode: 400,
      };
    }

    const refreshToken = await AuthRepository.refreshTokenCheck(
      clientRefreshToken
    );

    if (!refreshToken) {
      return {
        error: "Not Found",
        message: "유저의 토큰 정보가 없습니다.",
        statusCode: 404,
      };
    }

    const userRefreshTokenPayload = JwtService.verifyRefreshToken(
      refreshToken.refresh_token
    );

    if (userRefreshTokenPayload.error) {
      return userRefreshTokenPayload;
    }

    const accessToken = JwtService.createAccessToken({
      id: userRefreshTokenPayload.id,
      no: userRefreshTokenPayload.no,
    });

    return {
      message: "액세스 토큰 재발급 완료됐습니다.",
      accessToken,
      statusCode: 200,
    };
  }
}
export default AuthService;
