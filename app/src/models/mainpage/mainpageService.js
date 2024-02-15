import MainpageRepository from "./mainpageRepository.js";

export default class MainpageService {
  constructor(data) {
    this.headers = data.headers;
    this.params = data.params;
    this.query = data.query;
  }

  async getUserName() {
    const userNo = this.headers.user_no;

    const [rows, fields] = await MainpageRepository.getUserName(userNo);

    console.log(rows[0]);

    return {statusCode: 201, userName: rows[0].nickname};
  }

  async getBoardsAndLoveCountAndCommentCount() {
    const numberBoardsYouWant = Number(this.query.numberBoardsYouWant);
    const categoryNo = Number(this.query.categoryNo);

    let currentPageNumber = this.params.currentPageNumber - 1;

    const boardsCount = await MainpageRepository.getBoardsCount(categoryNo);

    const numberAllPages = Math.ceil(
      boardsCount[0][0].board_count / numberBoardsYouWant
    );

    if (boardsCount[0][0].board_count === 0) {
      return {allPagesCount: numberAllPages, statusCode: 200};
    } else if (currentPageNumber + 1 > numberAllPages) {
      return {
        error: "Bad Request",
        message: "해당 페이지는 없습니다.",
        statusCode: 404,
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

    return {board: rows, allPagesCount: numberAllPages, statusCode: 200};
  }
}
