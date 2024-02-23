"use strict";

import jwt from "jsonwebtoken";

import AuthService from "../../models/auth/authService.js";
import ctrl from "./authCtrl.js";

const tokenProcess = {
  accessToken: async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      const response = {
        error: "Bad Request",
        message: "토큰이 없습니다.",
        statusCode: 400,
      };
      return res.status(response.statusCode).json(response);
    }

    const [type, clientAccessToken] = token.split(" ");
    if (type !== "Bearer") {
      return {
        error: "Bad Request",
        message: "잘못된 토큰 타입입니다.",
        statusCode: 400,
      };
    }

    try {
      const payload = jwt.verify(
        clientAccessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log("토큰 인증 성공", payload);

      req.user = {...payload};
      const auth = new AuthService(req);
      const response = await auth.checkAccessToken();

      if (response.statusCode === 404) {
        return res.status(response.statusCode).json(response);
      }
      next();
    } catch (err) {
      console.log("유효하지 않은 토큰입니다.");

      const response = {
        error: "Unauthorized",
        message: err.message,
        statusCode: 401,
      };

      return res.status(response.statusCode).json(response);
    }
  },
};
export default {
  tokenProcess,
};
