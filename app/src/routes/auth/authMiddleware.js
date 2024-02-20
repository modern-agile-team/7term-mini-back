"use strict";

import jwt from "jsonwebtoken";

const tokenProcess = {
  accessToken: async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
      const response = {
        error: "Bad Request",
        message: "토큰이 없습니다.",
        statusCode: 400,
      };
      return res.status(response.statusCode).json(response);
    }
    const [type, clientAccessToken] = token.split(" ");
    try {
      let payload = jwt.verify(
        clientAccessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log("토큰 인증 성공", payload);
      req.user = {...payload};
      console.log(req.user);
      // res.json({ message: "인증 성공" });
      next();
    } catch (err) {
      console.log("유효하지 않은 토큰입니다.");
      const response = {
        error: "Unauthorized",
        message: err.message,
        statusCode: 401,
      };
      res.status(response.statusCode).json(response);
      next(err);
    }
  },
};
export default {
  tokenProcess,
};
