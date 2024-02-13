"use strict";

import User from "../../models/auth/authService.js"

const process = {
    login : async (req, res) => {
        const user = new User(req);
        const response =  await user.login();
        return res.json(response).status(response.statusCode);
    }
};
export default {
    process,    
};