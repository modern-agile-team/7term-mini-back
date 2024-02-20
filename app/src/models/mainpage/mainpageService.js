import MainpageRepository from "./mainpageRepository.js";
import BoardRepository from "../board/boardRepository.js";
import {check} from "express-validator";

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

    const checkCategoryNo = await BoardRepository.checkCategoryNo(categoryNo);

    if (categoryNo !== 0) {
      if (!checkCategoryNo[0][0]) {
        return {
          error: "Not Found",
          message: "해당 카테고리는 없습니다.",
          statusCode: 404,
        };
      }
    }
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
