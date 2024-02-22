"use strict";

import db from "../../config/db.js";

class UserRepository {
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

  static delete(userNo) {
    const query = "DELETE FROM user WHERE no = ?;";
    return db.query(query, [userNo]);
  }

  static getUser(userId) {
    const query = "SELECT * FROM user WHERE id = ?;";
    return db.query(query, [userId]);
  }

  static findOneUser(userNo) {
    const query = "SELECT * FROM user WHERE no = ?;";
    return db.query(query, [userNo]);
  }
}

export default UserRepository;
