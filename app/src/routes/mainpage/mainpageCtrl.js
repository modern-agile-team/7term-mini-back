import MainpageService from "../../models/mainpage/mainpageService.js";
export default {
  process: {
    getUser: async (req, res) => {},

    getBoardsAndLoveCountAndCommentCount: async (req, res) => {
      const instance = new MainpageService(req);

      const response = await instance.getBoardsAndLoveCountAndCommentCount();

      res.status(response.statusCode).json(response);
    },
  },
};
