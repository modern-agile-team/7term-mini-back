import BoardRepository from "./boardRepository.js";

export default class BoardService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.user = req.user;
    this.query = req.query;
  }

  async appendBoard() {
    const userNo = this.user.no;
    const {categoryNo, content} = this.body;

    const error = await BoardRepository.findCategoryNo(categoryNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 카테고리 번호는 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    const appendResult = await BoardRepository.apppendBoard(
      userNo,
      categoryNo,
      content
    );

    if (appendResult[0].affectedRows) {
      return {message: "게시글이 생성됐습니다.", statusCode: 201};
    }

    return {
      error: "Internal Server Error",
      message: "게시글을 삭제하는 중 알수없는 에러가 발생했습니다.",
      statusCode: 500,
    };
  }

  async deleteBoard() {
    const userNo = this.user.no;
    const boardNo = this.params.boardNo;

    const [rows, feilds] = await BoardRepository.findOneBoard(boardNo);

    if (!rows[0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시글은 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    if (userNo !== rows[0].user_no) {
      return {
        error: "Forbidden",
        message: "자신이 쓴 게시글만 삭제 할 수 있습니다.",
        statusCode: 403,
      };
    }

    const deleteResult = await BoardRepository.deleteBoard(boardNo);

    if (deleteResult[0].affectedRows) {
      return {message: "게시글이 정상적으로 삭제됐습니다.", statusCode: 200};
    }

    return {
      error: "Internal Server Error",
      message: "게시글을 삭제하는 중 알수없는 에러가 발생했습니다.",
      statusCode: 500,
    };
  }

  async findOneBoardWithNicknameAndLoveCount() {
    const boardNo = this.params.boardNo;

    const [rows, fields] =
      await BoardRepository.findOneBoardWithNicknameAndLoveCount(boardNo);

    if (!rows[0].no) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시글은 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    return {board: rows[0], statusCode: 200};
  }

  async updateBoard() {
    const boardNo = this.params.boardNo;
    const {categoryNo, content} = this.body;
    const userNo = this.user.no;

    const [rows, feilds] = await BoardRepository.findOneBoard(boardNo);

    if (!rows[0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시글은 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    if (userNo !== rows[0].user_no) {
      return {
        error: "Forbidden",
        message: "자신이 쓴 게시글만 수정 할 수 있습니다.",
        statusCode: 403,
      };
    }

    const checkCategoryNo = await BoardRepository.findCategoryNo(categoryNo);

    if (!checkCategoryNo[0][0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 카테고리는 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    const updateResult = await BoardRepository.updateBoard(
      boardNo,
      categoryNo,
      content
    );

    if (updateResult[0].affectedRows) {
      return {message: "게시물이 수정이 완료됐습니다.", statusCode: 200};
    }

    return {
      error: "Internal Server Error",
      message: "게시글을 수정하는 중 알수없는 에러가 발생했습니다.",
      statusCode: 500,
    };
  }

  async getBoardsAndLoveCountAndCommentCount() {
    const pageSize = Number(this.query.pageSize);
    const categoryNo = Number(this.query.categoryNo);
    const currentPage = (Number(this.query.currentPage) - 1) * pageSize;

    const boardsCount = await BoardRepository.getBoardsCount(categoryNo);

    const numberAllPages = Math.ceil(boardsCount[0][0].board_count / pageSize);

    const checkCategoryNo = await BoardRepository.findCategoryNo(categoryNo);

    if (categoryNo !== 0) {
      if (!checkCategoryNo[0][0]) {
        return {
          error: "Not Found",
          message: "해당 카테고리는 없습니다.",
          statusCode: 404,
        };
      }
    }

    const [rows, fields] =
      await BoardRepository.getBoardsAndLoveCountAndCommentCount(
        currentPage,
        pageSize,
        categoryNo
      );

    return {boards: rows, wholePage: numberAllPages, statusCode: 200};
  }
}
