import MainpageRepository from "./mainpageRepository.js";

export default class MainpageService {
  constructor(data) {
    this.headers = data.headers;
    this.body = data.body;
    this.params = data.params;
  }

  async getUserName() {}

  async getBoardsAndLoveCountAndCommentCount() {
    let pageNo = this.params.pageNo - 1;
    const pages = this.body.pages;

    pageNo = pages * pageNo;

    const response =
      await MainpageRepository.getBoardsAndLoveCountAndCommentCount(
        pageNo,
        pages
      );

    return response;
  }
}
