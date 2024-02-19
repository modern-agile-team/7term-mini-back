import MainpageService from "../../models/mainpage/mainpageService.js";

export default {
  getUser: async (req, res) => {
    const mainpageService = new MainpageService(req);

    const response = await mainpageService.getUserName();

    res.status(response.statusCode).json(response);
  },

  getBoardsAndLoveCountAndCommentCount: async (req, res) => {
    const mainpageService = new MainpageService(req);

    const response =
      await mainpageService.getBoardsAndLoveCountAndCommentCount();

    res.status(response.statusCode).json(response);
  },
};
