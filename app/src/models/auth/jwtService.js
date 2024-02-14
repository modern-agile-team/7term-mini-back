"use strict";
import jwt from "jsonwebtoken";
class JwtToken {
    static async createAccessToken(id) {        
        const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: "1m",
        })
        return accessToken;
    }
    static async createRefreshToken(id) {        
        const refreshToken = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: "24h"
        })
        return refreshToken;
    }
    static async verifyToken(token){
        try {
            return jwt.verify(token, REFRESH_TOKEN_SECRET);
        } catch (err) {
            return { error : 'Unauthorized', message : "유효하지 않은 토큰입니다.", statusCode : 401};
        }
    }                    
}
export default JwtToken;