"use strict";
import jwt from "jsonwebtoken";

class JwtToken {
  static async createAccessToken(id) {
    const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    })
    return accessToken;
  }
  static async createRefreshToken(id) {
    const refreshToken = jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "24h"
    })
    return refreshToken;
  }
  static async verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return { error: 'Unauthorized', message: err.message, statusCode: 401 };
    }
  }
  static async verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return { error: 'Unauthorized', message: err.message, statusCode: 401 };
    }
  }
}
export default JwtToken;