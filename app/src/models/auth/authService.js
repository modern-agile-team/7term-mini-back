"use strict";

import AuthRepository from "./authRepository.js";
import JwtService from "./jwtService.js";

class AuthService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.headers = req.headers;
  };

  async login() {
    const loginRequestBody = this.body;

    if (!loginRequestBody.id) {
      return { error: 'Bad Request', message: "아이디가 공백입니다.", statusCode: 400 };
    };

    if (!loginRequestBody.password) {
      return { error: 'Bad Request', message: "비밀번호가 공백입니다.", statusCode: 400 };
    };

    const userInfo = await AuthRepository.findUsers(loginRequestBody.id, loginRequestBody.password);
    if (!userInfo[0][0]) {
      return { error: 'Not Found', message: "유저 정보가 없습니다.", statusCode: 404 };
    };

    const accessToken = JwtService.createAccessToken({ id: userInfo[0][0].id, no: userInfo[0][0].no });
    const refreshToken = JwtService.createRefreshToken({ id: userInfo[0][0].id, no: userInfo[0][0].no });
    AuthRepository.tokenSave(userInfo[0][0].no, refreshToken);
    return { message: "로그인에 성공하였습니다.", accessToken, refreshToken, userNickName: userInfo[0][0].nickname, statusCode: 201 };
  };

  async newAccessToken() {
    const authorization = this.headers['authorization'];

    if (!authorization) {
      return { error: 'Bad Request', message: "토큰이 없습니다.", statusCode: 400 };
    };

    const [type, clientRefreshToken] = authorization.split(' ');
    if (type !== "Bearer") {
      return { error: 'Bad Request', message: "잘못된 토큰 타입입니다.", statusCode: 400 };
    };

    const refreshToken = await AuthRepository.refreshTokenCheck(clientRefreshToken); // DB상에서 토큰 여부 검사

    if (!refreshToken[0][0]) {
      return { error: 'Not Found', message: "유저의 토큰 정보가 없습니다.", statusCode: 404 };
    };

    const userRefreshTokenPayload = JwtService.verifyRefreshToken(refreshToken[0][0].refresh_token); // 받은 토큰의 유효기간 검사.
    if (userRefreshTokenPayload.error) {
      return userRefreshTokenPayload;
    };

    const userAccessToken = JwtService.createAccessToken({ id: userRefreshTokenPayload.id, no: userRefreshTokenPayload.no });//...userRefreshTokenCheck로 변경시 에러
    return { message: "액세스 토큰 재발급 완료됐습니다.", accessToken: userAccessToken, statusCode: 200 };
  };
};
export default AuthService;