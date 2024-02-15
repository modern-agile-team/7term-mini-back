"use strict";

import CommentService from "../../models/comment/commentService.js";
import {validationResult} from "express-validator";

const process = {
  addComments: async (req, res) => {
    const error = validationResult(req).errors[0];
    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, Statuscode: 400});
    }
    const comment = new CommentService(req);
    const response = await comment.addComments();
    return res.status(response.Statuscode).json(response);
  },
  deleteComments: async (req, res) => {
    const error = validationResult(req).errors[0];
    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, Statuscode: 400});
    }
    const comment = new CommentService(req);
    const response = await comment.deleteComments();
    return res.status(response.Statuscode).json(response);
  },
  getComments: async (req, res) => {
    const error = validationResult(req).errors[0];
    if (error) {
      return res
        .status(400)
        .json({error: "Bad Request", message: error.msg, Statuscode: 400});
    }
    const comment = new CommentService(req);
    const response = await comment.getComments();
    return res.status(response.Statuscode).json(response);
  },
};

export default {process};
