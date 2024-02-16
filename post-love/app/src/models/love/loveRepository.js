"use strict";

import db from "../../config/db.js";

class LoveRepository {
  static getLove(userNo, boardNo) {
    const query = "INSERT INTO board_love(user_no, board_no) VALUES(?, ?);";
    return db.query(query, [userNo, boardNo]);
  }
  static deleteLove(userNo, boardNo) {
    const query = "delete from board_love where user_no =? and board_no =?;";
    return db.query(query, [userNo, boardNo]);
  }
  static isUserNo(userNo) {
    const query = "select no from user where no = ?;";
    return db.query(query, [userNo]);
  }
  static isBoardNo(boardNo) {
    const query = "select no from board where no =?;";
    return db.query(query, [boardNo]);
  }
  static duplication(boardNo, userNo) {
    const query =
      "select user_no from board_love where board_no= ? and user_no = ?;";
    return db.query(query, [boardNo, userNo]);
  }
}

export default LoveRepository;
