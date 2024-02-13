"use strict";

import db from "../../config/db.js";
// import { resolve }  from "path"
// import { reject, log } from "async";

class UserStorage {
    static async check(userId, userPassWord){
        const query = "SELECT * FROM user WHERE id = ? AND password = ?;";
        const [rows, fields] = await db.query(query, [userId, userPassWord]);
        return rows;
    }
}
export default UserStorage;