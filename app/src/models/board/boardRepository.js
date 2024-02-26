import db from "../../config/db.js";

export default class BoardRepository {
  static findOneBoard(boardNo) {
    const query = "SELECT * FROM board WHERE no = ?";

    return db.query(query, [boardNo]);
  }

  static appendBoard(userNo, categoryNo, content) {
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

  static getBoardsCount(categoryNo) {
    let where = "";

    if (categoryNo && categoryNo !== 5) {
      where = `WHERE board.category_no = ${categoryNo}`;
    }

    const query = `
    SELECT count(*) AS board_count 
    FROM board
    ${where};`;

    return db.query(query);
  }

  static getBoardsAndLoveCountAndCommentCount(pageNo, pages, categoryNo) {
    let where = "";

    let orderBy = "ORDER BY b.no DESC LIMIT ?, ?";

    // 0은 전체, 5는 인기
    if (categoryNo && categoryNo !== 5)
      where = `WHERE b.category_no = ${categoryNo}`;

    if (categoryNo === 5)
      orderBy = "ORDER BY love_count DESC, created_at DESC LIMIT ?, ?";

    const query = `SELECT b.no, c.no as category_no, c.name as category_name, u.nickname, b.content, b.created_at, b.updated_at, 
    COUNT(DISTINCT co.no) as comment_count,
    COUNT(DISTINCT bl.no) as love_count
    FROM board as b
    LEFT JOIN user as u
    ON b.user_no = u.no
      LEFT JOIN comment as co
      ON co.board_no = b.no
      LEFT JOIN board_love as bl
      ON bl.board_no = b.no
      LEFT JOIN category as c
      ON b.category_no = c.no
      ${where}
      group by b.no
      ${orderBy};`;

    return db.query(query, [pageNo, pages]);
  }

  //사실 여기있으면 안되긴해..
  static findCategoryNo(categoryNo) {
    const query = "SELECT no FROM category WHERE no = ?";

    return db.query(query, [categoryNo]);
  }
}
