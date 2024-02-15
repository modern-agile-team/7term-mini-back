import MainpageRepository from "./mainpageRepository.js";

export default class MainpageService {
  constructor(data) {
    this.headers = data.headers;
    this.body = data.body;
    this.params = data.params;
  }

  async getUserName() {
    const userNo = this.headers.user_no;

    const [rows, fields] = await MainpageRepository.getUserName(userNo);

    console.log(rows[0]);

    return {statusCode: 201, userName: rows[0].nickname};
  }

  async getBoardsAndLoveCountAndCommentCount() {
    const numberBoardsYouWant = this.body.numberBoardsYouWant;
    const categoryNo = this.body.categoryNo;

    let currentPageNumber = this.params.currentPageNumber - 1;

    const boardsCount = await MainpageRepository.getBoardsCount(categoryNo);

    const numberAllPages = Math.ceil(
      boardsCount[0][0].board_count / numberBoardsYouWant
    );

    if (boardsCount[0][0].board_count === 0) {
      return {allPagesCount: numberAllPages, statusCode: 201};
    } else if (currentPageNumber + 1 > numberAllPages) {
      return {
        error: "Bad Request",
        message: "해당 페이지는 없습니다.",
        statusCode: 400,
      };
    }
    //쿼리를 위한 가공
    currentPageNumber = currentPageNumber * numberBoardsYouWant;

    const [rows, fields] =
      await MainpageRepository.getBoardsAndLoveCountAndCommentCount(
        currentPageNumber,
        numberBoardsYouWant,
        categoryNo
      );

    return {board: rows, allPagesCount: numberAllPages, statusCode: 201};
  }
}
