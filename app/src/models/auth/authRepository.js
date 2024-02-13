"use strict";

import db from "../../config/db.js";
// import { resolve }  from "path"
// import { reject, log } from "async";

class UserStorage {
    static async check(userId, userNickName){
        const query = "SELECT * FROM user WHERE id = ? OR nickname = ?;";
        const [raws, fields] = await db.query(query, [userId, userNickName]);
        return raws[0]
    }

    static async save (userInfo){
        console.log(userInfo)
        const query = "INSERT INTO user (`nickname`, `id`, `password`, `email`) VALUES (?, ?, ?, ?);";
        const [raws, fields] = await db.query(query,
            [userInfo.nickname, userInfo.id, userInfo.password, userInfo.email]
            );
        return raws[0];
    }
}
export default UserStorage;