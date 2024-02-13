"use strict";

import AuthStorage from "./authRepository.js"
import jwtToken from "./jwt.js"
class Auth {
    constructor(req) {
        this.body = req.body;
        this.params = req.params;
    }
    async login() {
        const clientInfo = this.body;
        if(!clientInfo.id){
            return { error : 'Bad Request', message : "아이디가 공백입니다.", statusCode : 400};
        }
        if(!clientInfo.password){
            return { error : 'Bad Request', message : "비밀번호가 공백입니다.", statusCode : 400};
        }
        const userInfo = await AuthStorage.check(clientInfo.id, clientInfo.password);
        if(!userInfo[0]){
            return { error : 'Bad Request', message : "유저 정보가 없습니다.", statusCode : 400};
        }
        const userAccessToken = await jwtToken.createAccessToken({id : userInfo.id});
        const userRefreshToken = await jwtToken.createRefreshToken({id : userInfo.id}); 
        const userTokenInfo = await AuthStorage.tokenSave(userInfo[0].no, userRefreshToken);
        return { message : "로그인에 성공하였습니다.", accessToken: userAccessToken, refreshToken : userRefreshToken, userNickName : userInfo[0].nickname, statusCode : 200};
    }
}
export default Auth;