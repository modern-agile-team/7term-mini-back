"use strict";

import db from "../../config/love/db.js";

class LoveRepository {
  static getLove(userNo, boardNo) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO board_love(user_no, board_no) VALUES(?, ?);";
        db.query(query, [userNo, boardNo], (err) => {
          if(err) reject(`${err}`);
          resolve({ success: true });
        });
    });
  }
}

export default LoveRepository;