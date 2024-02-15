"use strict";

import db from "../../config/db.js";

class CommentRepository {
  static addComments(boardNo, userNo, comments) {
    const query =
      "insert into comment(board_no, user_no, content) values(?, ?, ?);";
    return db.query(query, [boardNo, userNo, comments]);
  }
  static deleteComments(No) {
    const query = "delete from comment where no = ?;";
    return db.query(query, [No]);
  }
  static getComments(boardNo) {
    const query =
      "select * , (select count(*) from comment where board_no = ?) as comment_count from comment where board_no =?;";
    return db.query(query, [boardNo, boardNo]);
  }
}

export default CommentRepository;
