"use strict";

import AuthService from "../../models/auth/authService.js"

const process = {
  login: async (req, res) => {
    const auth = new AuthService(req);
    const response = await auth.login();
    return res.json(response).status(response.statusCode);
  },
  newAccessToken: async (req, res) => {
    const auth = new AuthService(req);
    const response = await auth.newAccessToken();
    return res.json(response).status(response.statusCode);
  },
  logout: async (req, res) => {
    const auth = new AuthService(req);
    const response = await auth.logout();
    return res.json(response).status(response.statusCode)
  }
};
export default {
  process,
};