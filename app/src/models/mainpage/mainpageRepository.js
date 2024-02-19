import db from "../../config/db.js";

export default class MainpageRepository {
  static getUserName(userNo) {
    const query = `SELECT nickname FROM USER WHERE no = ?`;

    return db.query(query, [userNo]);
  }

  static getBoardsAndLoveCountAndCommentCount(pageNo, pages, categoryNo) {
    let where = "";

    // 0을 주면 전체 게시글을 불러옴
    if (categoryNo) {
      where = `WHERE b.category_no = ${categoryNo}`;
    }

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
      order by b.no DESC limit ?, ?;`;

    return db.query(query, [pageNo, pages]);
  }

  static getBoardsCount(categoryNo) {
    let where = "";

    if (categoryNo) {
      where = `WHERE board.category_no = ${categoryNo}`;
    }

    const query = `
    SELECT count(*) AS board_count 
    FROM board
    ${where};`;

    return db.query(query);
  }
}
