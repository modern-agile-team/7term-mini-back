"use strict";

import db from "../../config/db.js";

class AuthStorage {
  static findUsers(userId, userPassWord) {
    const query = "SELECT * FROM user WHERE id = ? AND password = ?;";
    return db.query(query, [userId, userPassWord]);
  };

  static tokenSave(userNo, userRefreshToken) {
    const query = "INSERT INTO token (`user_no`, `refresh_token`) VALUES (?, ?)";
    return db.query(query, [userNo, userRefreshToken]);
  };

  static refreshTokenCheck(clientRefreshToken) {
    const query = "SELECT * FROM token WHERE refresh_token = ?;";
    return db.query(query, [clientRefreshToken]);
  };
};
export default AuthStorage;