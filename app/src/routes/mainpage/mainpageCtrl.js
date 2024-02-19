import MainpageService from "../../models/mainpage/mainpageService.js";

export default {
  getUser: async (req, res) => {
    const instance = new MainpageService(req);

    const response = await instance.getUserName();

    res.status(response.statusCode).json(response);
  },

  getBoardsAndLoveCountAndCommentCount: async (req, res) => {
    const instance = new MainpageService(req);

    const response = await instance.getBoardsAndLoveCountAndCommentCount();

    res.status(response.statusCode).json(response);
  },
};
