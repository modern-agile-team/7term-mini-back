"use strict";

import CommentService from "../../models/comment/commentService.js";

const process = {
  addComments: async (req, res) => {
    const comment = new CommentService(req);
    const response = await comment.addComments();
    return res.status(response.statuscode).json(response);
  },
  deleteComments: async (req, res) => {
    const comment = new CommentService(req);
    const response = await comment.deleteComments();
    return res.status(response.statuscode).json(response);
  },
  getComments: async (req, res) => {
    const comment = new CommentService(req);
    const response = await comment.getComments();
    return res.status(response.statuscode).json(response);
  },
};

export default {process};
