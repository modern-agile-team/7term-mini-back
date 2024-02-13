"use strict";
import jwt from "jsonwebtoken";
class jwtToken {
    static async createAccessToken(id) {        
        const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: "15m",
        })
        return accessToken;
    }
    static async createRefreshToken(id) {        
        const refreshToken = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: "180 days"
        })
        return refreshToken;
    }                    
}
export default jwtToken;