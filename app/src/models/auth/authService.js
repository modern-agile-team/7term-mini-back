"use strict";

import UserStorage from "./authRepository.js"

class User {
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
        const userInfo = await UserStorage.check(clientInfo.id, clientInfo.password)
        if(!userInfo[0]){
            return { error : 'Bad Request', message : "유저 정보가 없습니다.", statusCode : 400};
            }
        return { message : "로그인에 성공하였습니다.", userNickName : userInfo[0].nickname, statusCode : 200};
    }
}
export default User;