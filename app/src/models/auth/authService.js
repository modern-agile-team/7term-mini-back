"use strict";

import AuthStorage from "./authRepository.js"
import JwtService from "./jwtService.js"
class Auth {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.headers = req.headers;
  }
  async login() {
    const clientInfo = this.body;
    if (!clientInfo.id) {
      return { error: 'Bad Request', message: "아이디가 공백입니다.", statusCode: 400 };
    }
    if (!clientInfo.password) {
      return { error: 'Bad Request', message: "비밀번호가 공백입니다.", statusCode: 400 };
    }
    const userInfo = await AuthStorage.check(clientInfo.id, clientInfo.password);
    if (!userInfo[0]) {
      return { error: 'Bad Request', message: " 없습니다.", statusCode: 400 };
    }
    const userAccessToken = JwtService.createAccessToken({ id: userInfo[0].id, no: userInfo[0].no });
    const userRefreshToken = JwtService.createRefreshToken({ id: userInfo[0].id, no: userInfo[0].no });
    await AuthStorage.tokenSave(userInfo[0].no, userRefreshToken);
    return { message: "로그인에 성공하였습니다.", accessToken: userAccessToken, refreshToken: userRefreshToken, userNickName: userInfo[0].nickname, statusCode: 200 };
  }
  async access() {
    const client = this.headers['authorization'];
    if (!client) {
      return { error: 'Bad Request', message: "토큰이 없습니다.", statusCode: 400 };
    }
    const [type, clientRefreshToken] = client.split(' ');
    const userRefreshToken = await AuthStorage.refreshTokenCheck(clientRefreshToken);
    if (!userRefreshToken[0]) {
      return { error: 'Bad Request', message: "토큰 정보가 없습니다.", statusCode: 400 };
    }
    const userRefreshTokenCheck = JwtService.verifyRefreshToken(clientRefreshToken);
    if (userRefreshTokenCheck.error) {
      return userRefreshTokenCheck;
    }
    const userAccessToken = JwtService.createAccessToken({ id: userRefreshTokenCheck.id, no: userRefreshTokenCheck.no });//...userRefreshTokenCheck 변경시 에러
    return { message: "액세스 토큰 재발급 완료됐습니다.", accessToken: userAccessToken, statusCode: 200 };
  }
}
export default Auth;