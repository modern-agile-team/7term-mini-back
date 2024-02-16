"use strict";

import LoveService from "../../models/love/loveService.js";
import {validationResult} from "express-validator";

const process = {
  getLove: async (req, res) => {
    const error = validationResult(req).errors[0];
    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, Statuscode: 400});
    }
    const love = new LoveService(req);
    const response = await love.getLove();
    return res.status(response.statuscode).json(response);
  },
  deleteLove: async (req, res) => {
    const error = validationResult(req).errors[0];
    if (error) {
      return res.status(400).json({
        error: "Bad Request",
        message: error.msg,
        Statuscode: 400,
      });
    }
    const love = new LoveService(req);
    const response = await love.deleteLove();
    return res.status(response.statuscode).json(response);
  },
};

export default {process};
