"use strict";

import CommentService from "../../models/comment/commentService.js";

const process = {
  addComments: async (req, res) => {
    const comment = new CommentService(req);
    const response = await comment.addComments();
    return res.json(response);
  },
  deleteComments : async (req,res) => {
    const comment = new CommentService(req);
    const response = await comment.deleteComments();
    return res.json(response);
  }
};

export default { process };
