"use strict";

import db from "../../config/db.js";

class CommentRepository {
  static addComments(boardNo, userNo, comments) {
    const query =
      "insert into comment(board_no, user_no, content) values(?, ?, ?);";
    return db.query(query, [boardNo, userNo, comments]);
  }

  static deleteComment(commentNo) {
    const query = "delete from comment where no = ?;";
    return db.query(query, [commentNo]);
  }

  static getComments(boardNo, commentPage) {
    const query = `select c.no, c.board_no, u.nickname, c.user_no, c.content, c.created_at
    from comment as c
    LEFT JOIN user as u
    ON c.user_no = u.no
    where board_no = ? 
    order by c.created_at desc limit ?, 2;`;
    return db.query(query, [boardNo, commentPage]);
  }

  static checkCommentNo(commentNo) {
    const query = "select no from comment where no = ?;";
    return db.query(query, [commentNo]);
  }

  static showContent(insertId) {
    const query = "select content,created_at from comment where no =?;";
    return db.query(query, [insertId]);
  }

  static checkCommentOwner(userNo, commentNo) {
    const query = "select user_no from comment where user_no=? and no = ?;";
    return db.query(query, [userNo, commentNo]);
  }
  static getCommentCount(boardNo) {
    const query =
      "SELECT count(*) as commentCount FROM comment WHERE board_no = ?;";
    return db.query(query, [boardNo]);
  }
}

export default CommentRepository;
