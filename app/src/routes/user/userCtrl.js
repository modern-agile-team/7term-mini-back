"use strict";

import User from "../../models/user/userService.js";

const process = {
  createUser: async (req, res) => {
    const user = new User(req);
    const response = await user.createUser();

    return res.status(response.statusCode).json(response);
  },
};
export default {
  process,
};
