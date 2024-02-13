"use strict";

import LoveService from "../../models/love/loveService.js";

const process = {
    getLove : async (req, res) => {
        const love = new LoveService(req);
        const response = await love.getLove();
        return res.json(response);
    }
};

export default {process};


