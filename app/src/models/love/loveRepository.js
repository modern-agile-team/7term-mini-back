"use strict";

import db from "../../config/db.js";

class LoveRepository {
  static addLove(userNo, boardNo) {
    const query = "INSERT INTO board_love(user_no, board_no) VALUES(?, ?);";
    return db.query(query, [userNo, boardNo]);
  }

  static deleteLove(userNo, boardNo) {
    const query = "delete from board_love where user_no =? and board_no =?;";
    return db.query(query, [userNo, boardNo]);
  }

  static selectLoveNoAndUserNo(boardNo, userNo) {
    const query =
      "select user_no, no from board_love where board_no =? and user_no = ?;";
    return db.query(query, [boardNo, userNo]);
  }
}

export default LoveRepository;
