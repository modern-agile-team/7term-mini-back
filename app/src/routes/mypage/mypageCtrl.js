"use strict";

import mypageService from "../../models/mypage/mypageService.js";

const process = {
  showUserInformation: async (req, res) => {
    const mypage = new mypageService(req);
    const response = await mypage.showUserInformation();
    return res.status(response.statuscode).json(response);
  },
};

export default {
  process,
};
