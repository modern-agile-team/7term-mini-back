"use strict";

import db from "../../config/db.js";

class AuthStorage {
  static async findUsers(userId, userPassWord) {
    const query = "SELECT * FROM user WHERE id = ? AND password = ?;";
    const [users, field] = await db.query(query, [userId, userPassWord]);
    return users[0];
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
};
export default AuthStorage;