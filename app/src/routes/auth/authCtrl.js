"use strict";

import User from "../../models/auth/authService.js"

const process = {
    createUser : async (req, res) => {
        const user = new User(req);
        const response =  await user.createUser();
        return res.json(response).status(response.statusCode);
    }
};
export default {
    process,    
};