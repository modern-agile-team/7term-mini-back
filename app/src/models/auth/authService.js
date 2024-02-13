"use strict";

import UserStorage from "./authRepository.js"

class User {
    constructor(req) {
        this.body = req.body;
        this.params = req.params;
    }
    async createUser() {
        const clientInfo = this.body;
        if(!clientInfo.nickname){
            return { error : 'Bad Request', message : "닉네임이 공백입니다.", statusCode : 400};
        }
        if(!clientInfo.id){
            return { error : 'Bad Request', message : "아이디가 공백입니다.", statusCode : 400};
        }
        if(!clientInfo.password){
            return { error : 'Bad Request', message : "비밀번호가 공백입니다.", statusCode : 400};
        }
        if(!clientInfo.email){
            return { error : 'Bad Request', message : "이메일이 공백입니다.", statusCode : 400};
        }
        const userInfo = await UserStorage.check(clientInfo.id, clientInfo.nickname);// userInfoCheck 변수이름 바꾸기
        for(let i = 0; i < userInfo.length; i++){
            if(clientInfo.nickname === userInfo[i].nickname){
                return { error : 'Conflict', message : "닉네임이 중복입니다.", statusCode : 409};
            }if(clientInfo.id === userInfo[i].id){
                return { error : 'Conflict', message : "아이디가 중복입니다.", statusCode : 409};        
            }
        }
        if(!userInfo[0]){
            try {
                    const response = await UserStorage.save(clientInfo);
                    return { statusCode : 201, message : "회원가입이 정상적으로 됐습니다."};
                } catch (err) {
                    return { error : 'Internal Server Error', message : "내부 서버 오류", statusCode : 500};   
                }
            }
        // else{
        //     return { success : false, err : "올바른 값을 입력해 주세요."}
        // }
        
    }
}
export default User;