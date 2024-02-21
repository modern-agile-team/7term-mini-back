"use strict";

import LoveService from "../../models/love/loveService.js";

const process = {
  addLove: async (req, res) => {
    const love = new LoveService(req);
    const response = await love.addLove();
    return res.status(response.statuscode).json(response);
  },
  deleteLove: async (req, res) => {
    const love = new LoveService(req);
    const response = await love.deleteLove();
    return res.status(response.statuscode).json(response);
  },
};

export default {process};
