"use strict";

import UserService from "../../models/user/userService.js";

const process = {
  createUser: async (req, res) => {
    const user = new UserService(req);
    const response = await user.createUser();

    return res.status(response.statusCode).json(response);
  },
};
export default {
  process,
};
