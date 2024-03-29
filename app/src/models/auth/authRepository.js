"use strict";

import db from "../../config/db.js";

class AuthRepository {
  static findToken(userNo) {
    const query = "SELECT * FROM token where user_no = ?;";
    return db.query(query, [userNo]);
  }

  static tokenSave(userNo, userRefreshToken, userAccessToken) {
    const query =
      "INSERT INTO token (`user_no`, `refresh_token`, `access_token`) VALUES (?, ?, ?)";
    return db.query(query, [userNo, userRefreshToken, userAccessToken]);
  }

  static async refreshTokenFind(clientRefreshToken) {
    const query = "SELECT * FROM token WHERE refresh_token = ?;";
    const [users, field] = await db.query(query, [clientRefreshToken]);
    return users[0];
  }

  static deleteToken(userNo) {
    const query = "DELETE FROM token WHERE user_no = ?;";
    return db.query(query, [userNo]);
  }
}
export default AuthRepository;
