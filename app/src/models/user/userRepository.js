"use strict";

import db from "../../config/db.js";

class UserStorage {
  static async findUsers(id, nickname) {
    const query = "SELECT * FROM user WHERE id = ? OR nickname = ?;";
    const [rows, fields] = await db.query(query, [id, nickname]);
    return rows;
  }

  static async save(nickname, id, password, email) {
    const query =
      "INSERT INTO user (`nickname`, `id`, `password`, `email`) VALUES (?, ?, ?, ?);";
    const [rows, fields] = await db.query(query, [
      nickname,
      id,
      password,
      email,
    ]);
    return rows;
  }
}
export default UserStorage;
