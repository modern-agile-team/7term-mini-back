import MainpageRepository from "./mainpageRepository.js";

export default class MainpageService {
  constructor(data) {
    this.headers = data.headers;
    this.body = data.body;
    this.params = data.params;
  }

  async getUserName() {}

  async getBoardsAndLoveCountAndCommentCount() {
    const pages = this.body.pages;

    let pageNo = this.params.pageNo - 1;
    let categoryNo = this.body.categoryNo;

    pageNo = pages * pageNo;

    const response =
      await MainpageRepository.getBoardsAndLoveCountAndCommentCount(
        pageNo,
        pages,
        categoryNo
      );

    response.pop();

    console.log(response);

    return response;
  }
}
