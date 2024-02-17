"use strict";

import AuthStorage from "./authRepository.js"
import JwtService from "./jwtService.js"
class Auth {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.headers = req.headers;
  }
  // async check() {
  //   const client = this.headers['authorization'];
  //   if (!client) {
  //     return { error: 'Bad Request', message: "토큰이 없습니다.", statusCode: 400 };
  //   }
  //   const [type, clientAccessToken] = client.split(' ');
  //   const userAccessTokenCheck = await JwtService.verifyAccessToken(clientAccessToken);
  //   if (!userAccessTokenCheck.error) {
  //     return userAccessTokenCheck;
  //   }
  //   return { message: "액세스 토큰 확인 됐습니다.", statusCode: 200 }
  // }
  async login() {
    const clientInfo = this.body;
    if (!clientInfo.id) {
      return { error: 'Bad Request', message: "아이디가 공백입니다.", statusCode: 400 };
    }
    if (!clientInfo.password) {
      return { error: 'Bad Request', message: "비밀번호가 공백입니다.", statusCode: 400 };
    }
    const userInfo = await AuthStorage.check(clientInfo.id, clientInfo.password); //check 이름 바꾸기 (check는 에러를 뱉을 거 같은 느낌이다.)
    if (!userInfo[0]) {
      return { error: 'Bad Request', message: " 없습니다.", statusCode: 400 };
    }
    const userAccessToken = await JwtService.createAccessToken({ id: userInfo[0].id, no: userInfo[0].no });
    const userRefreshToken = await JwtService.createRefreshToken({ id: userInfo[0].id, no: userInfo[0].no });
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
    const userRefreshTokenCheck = await JwtService.verifyRefreshToken(clientRefreshToken);
    if (userRefreshTokenCheck.error) {
      return userRefreshTokenCheck;
    }
    const userAccessToken = await JwtService.createAccessToken({ id: userRefreshTokenCheck.id, no: userRefreshTokenCheck.no });
    return { message: "액세스 토큰 재발급 완료됐습니다.", accessToken: userAccessToken, statusCode: 200 };
  }
}
export default Auth;