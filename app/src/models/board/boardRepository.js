import db from "../../config/db.js";

export default class BoardRepository {
  static apppendBoard(userNo, categoryNo, content) {
    const query =
      "INSERT INTO board(user_no, category_no, content) VALUES (?, ?, ?);";

    return db.query(query, [userNo, categoryNo, content]);
  }

  static deleteBoard(boardNo) {
    const query = "DELETE FROM board WHERE no = ?";

    return db.query(query, [boardNo]);
  }

  static findOneBoardWithNicknameAndLoveCount(boardNo) {
    const query = `
    SELECT b.no, b.category_no, b.user_no, u.nickname, b.content, b.created_at, b.updated_at,
    COUNT(case WHEN l.board_no = ? then 0 end) as love_count
    FROM board as b
    LEFT JOIN user as u
    ON b.user_no = u.no
    LEFT JOIN board_love as l
    ON b.no = l.board_no
    WHERE b.no = ?;`;

    return db.query(query, [boardNo, boardNo]);
  }

  static updateBoard(boardNo, categoryNo, content) {
    const query =
      "UPDATE board as b SET category_no = ?, content = ?, updated_at = NOW() WHERE b.no = ?;";

    return db.query(query, [categoryNo, content, boardNo]);
  }

  static isUserNo(userNo) {
    const query = "SELECT no FROM user WHERE no = ?";

    return db.query(query, [userNo]);
  }

  static isBoardNo(boardNo) {
    const query = "SELECT no FROM board WHERE no = ?";

    return db.query(query, [boardNo]);
  }

  static isCategoryNo(categoryNo) {
    const query = "SELECT no FROM category WHERE no = ?";

    return db.query(query, [categoryNo]);
  }

  static checkBoardOwner(boardNo) {
    const query = "SELECT user_no as userNo FROM board WHERE no = ?";

    return db.query(query, [boardNo]);
  }
}
