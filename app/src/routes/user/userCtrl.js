"use strict";

import UserService from "../../models/user/userService.js";

const process = {
  createUser: async (req, res) => {
    const user = new UserService(req);
    const response = await user.createUser();

    return res.status(response.statusCode).json(response);
  },

  deleteUser: async (req, res) => {
    const user = new UserService(req);
    const response = await user.deleteUser();

    return res.status(response.statusCode).json(response);
  },

  findUserInformation: async (req, res) => {
    const mypage = new UserService(req);
    const response = await mypage.findUserInformation();

    return res.status(response.statuscode).json(response);
  },
};

export default {
  process,
};
