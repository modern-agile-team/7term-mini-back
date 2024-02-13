"use strict";

import db from "../../config/db.js";

class LoveRepository {
  static getLove(userNo, boardNo) {
    const query = "INSERT INTO board_love(user_no, board_no) VALUES(?, ?);";
    db.query(query, [userNo, boardNo]);
    return { success: true };
  }
  static deleteLove(userNo, boardNo) {
    const query = "delete from board_love where user_no =? and board_no =?;";
    db.query(query, [userNo, boardNo]);
    return { success: true }; 
  }
}

export default LoveRepository;
