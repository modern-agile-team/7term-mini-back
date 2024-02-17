"use strict";

import db from "../../config/db.js";
// import { resolve }  from "path"
// import { reject, log } from "async";

class AuthStorage {
  static async check(userId, userPassWord) {
    const query = "SELECT * FROM user WHERE id = ? AND password = ?;";
    const [rows, fields] = await db.query(query, [userId, userPassWord]);
    return rows;
  }
  static async tokenSave(userNo, userRefreshToken) {
    const query = "INSERT INTO token (`user_no`, `refresh_token`) VALUES (?, ?)";
    const [rows, fields] = await db.query(query, [userNo, userRefreshToken]);
    return rows;
  }
  static async refreshTokenCheck(clientRefreshToken) {
    const query = "SELECT * FROM token WHERE refresh_token = ?;";
    const [rows, fields] = await db.query(query, [clientRefreshToken]);
    return rows;
  }
}
export default AuthStorage;