import MainpageRepository from "./mainpageRepository.js";

export default class MainpageService {
  constructor(data) {
    this.headers = data.headers;
    this.body = data.body;
    this.params = data.params;
  }

  async getUserName() {}

  async getBoardsAndLoveCountAndCommentCount() {
    const numberBoardsYouWant = this.body.numberBoardsYouWant;
    const categoryNo = this.body.categoryNo;

    let currentPageNumber = this.params.currentPageNumber - 1;

    //쿼리를 위한 가공
    currentPageNumber = currentPageNumber * numberBoardsYouWant;

    const [rows, fields] =
      await MainpageRepository.getBoardsAndLoveCountAndCommentCount(
        currentPageNumber,
        numberBoardsYouWant,
        categoryNo
      );

    const boardsCount = await MainpageRepository.getBoardsCount(categoryNo);

    const numberAllPages =
      Math.ceil(boardsCount[0][0].board_count / numberBoardsYouWant) + 1;

    return {statusCode: 201, board: rows, allPagesCount: numberAllPages};
  }
}
