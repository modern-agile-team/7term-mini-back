"use strict";

import db from "../../config/db.js";

class CommentRepository {
  static addComments(boardNo, userNo, comments) {
    const query =
      "insert into comment(board_no, user_no, content) values(?, ?, ?);";
    return db.query(query, [boardNo, userNo, comments]);
  }

  static deleteComment(no) {
    const query = "delete from comment where no = ?;";
    return db.query(query, [no]);
  }

  static getComments(boardNo) {
    const query =
      "select * , (select count(*) from comment where board_no = ?) as comment_count from comment where board_no =?;";
    return db.query(query, [boardNo, boardNo]);
  }

  static checkUserNo(userNo) {
    const query = "select no from user where no = ?;";
    return db.query(query, [userNo]);
  }

  static checkCommentNo(commentNo) {
    const query = "select no from comment where no = ?;";
    return db.query(query, [commentNo]);
  }

  static showContent(insertId) {
    const query = "select content from comment where no =?;";
    return db.query(query, [insertId]);
  }

  static checkCommentOwner(userNo, no) {
    const query = "select user_no from comment where user_no=? and no = ?;";
    return db.query(query, [userNo, no]);
  }
}

export default CommentRepository;
