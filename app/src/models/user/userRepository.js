"use strict";

import db from "../../config/db.js";

class UserStorage {
  static async findUsers(id, nickName) {
    const query = "SELECT * FROM user WHERE id = ? OR nickname = ?;";
    const [rows, fields] = await db.query(query, [id, nickName]);
    return rows;
  }

  static async save(nickName, id, password, email) {
    const query =
      "INSERT INTO user (`nickname`, `id`, `password`, `email`) VALUES (?, ?, ?, ?);";
    const [rows, fields] = await db.query(query, [
      nickName,
      id,
      password,
      email,
    ]);
    return rows;
  }
}
export default UserStorage;
