"use strict";

import Auth from "../../models/auth/authService.js"

const process = {
    login : async (req, res) => {
        const auth = new Auth(req);
        const response =  await auth.login();
        return res.json(response).status(response.statusCode);
    }
};
export default {
    process,    
};