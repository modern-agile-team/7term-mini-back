"use strict";

import db from "../../config/db.js";

class AuthStorage {
  static getUser(userId) {
    const query = "SELECT * FROM user WHERE id = ?;";
    return db.query(query, [userId]);
  };

  static tokenSave(userNo, userRefreshToken) {
    const query = "INSERT INTO token (`user_no`, `refresh_token`) VALUES (?, ?)";
    return db.query(query, [userNo, userRefreshToken]);
  };

  static async refreshTokenCheck(clientRefreshToken) {
    const query = "SELECT * FROM token WHERE refresh_token = ?;";
    const [users, field] = await db.query(query, [clientRefreshToken]);
    return users[0];
  };

  static deleteRefreshToken(userNo) {
    const query = "DELETE FROM token WHERE user_no = ?;"
    return db.query(query, [userNo]);
  }
};
export default AuthStorage;