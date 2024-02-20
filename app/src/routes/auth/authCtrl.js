"use strict";

import Auth from "../../models/auth/authService.js";
// const output = {
//   check: async (req, res) => {
//     const auth = new Auth(req);
//     const response = await auth.check();
//     return res.json(response).status(response.statusCode);
//   }
// }
const process = {
  login: async (req, res) => {
    const auth = new Auth(req);
    const response = await auth.login();
    return res.json(response).status(response.statusCode);
  },
  access: async (req, res) => {
    const auth = new Auth(req);
    const response = await auth.access();
    return res.json(response).status(response.statusCode);
  },
};
export default {
  process,
};
