import MainpageRepository from "./mainpageRepository.js";

export default class MainpageService {
  constructor(req) {
    this.params = req.params;
    this.query = req.query;
    this.user = req.user;
  }

  async getUserName() {
    const userNo = this.user.no;

    const [rows, fields] = await MainpageRepository.getUserName(userNo);

    return {statusCode: 200, userName: rows[0].nickname};
  }

  async getBoardsAndLoveCountAndCommentCount() {
    const pageSize = Number(this.query.pageSize);
    const categoryNo = Number(this.query.categoryNo);

    let currentPageNumber = this.params.currentPageNumber - 1;

    const boardsCount = await MainpageRepository.getBoardsCount(categoryNo);

    const numberAllPages = Math.ceil(boardsCount[0][0].board_count / pageSize);

    if (boardsCount[0][0].board_count === 0) {
      return {allPagesCount: numberAllPages, statusCode: 200};
    } else if (currentPageNumber + 1 > numberAllPages) {
      return {
        error: "Not Found",
        message: "해당 페이지는 없습니다.",
        statusCode: 404,
      };
    }
    //해당 번호의 카테고리가 있는지 DB에서 확인해야함-------------------------------------------------이 작업은 board 브랜치에 만들어 놓은 것을 이용할것임

    //쿼리를 위한 가공
    currentPageNumber = currentPageNumber * pageSize;

    const [rows, fields] =
      await MainpageRepository.getBoardsAndLoveCountAndCommentCount(
        currentPageNumber,
        pageSize,
        categoryNo
      );

    return {boards: rows, wholePage: numberAllPages, statusCode: 200};
  }
}
