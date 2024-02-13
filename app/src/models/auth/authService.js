"use strict";

import UserStorage from "./authRepository.js"

class User {
    constructor(req) {
        this.body = req.body;
        this.params = req.params;
    }
    async createUser() {
        const userInfo = this.body;
    
        if(!(userInfo.nickname && userInfo.id && userInfo.password && userInfo.email)){
            return { success : false, msg : "400 올바른 값을 입력해주세요"}
        }
        const serverInfo = await UserStorage.check(userInfo.id, userInfo.nickname);// userInfoCheck 변수이름 바꾸기
        if(!serverInfo){
            try {
                    const response = await UserStorage.save(userInfo);
                    return response;
                } catch (err) {
                    return { success : false, msg : "회원가입 중 오류!"};
                }
            }
        if(userInfo.nickname === serverInfo.nickname){
            return {success : false, msg : "409 닉네임이 중복입니다!"}
        }if(userInfo.id === serverInfo.id){
            return {success : false, mag : "409 아이디가 중복입니다!" }
        }
        // else{
        //     return { success : false, err : "올바른 값을 입력해 주세요."}
        // }
        
    }
}
export default User;