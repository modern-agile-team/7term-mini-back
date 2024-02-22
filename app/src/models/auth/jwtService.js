"use strict";
import jwt from "jsonwebtoken";

class JwtToken {
  static createAccessToken(id) {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
  }

  static createRefreshToken(id) {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "24h",
    });
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return {error: "Unauthorized", message: err.message, statusCode: 401};
    }
  }
}
export default JwtToken;
