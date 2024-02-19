import BoardRepository from "./boardRepository.js";

export default class BoardService {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.headers = req.headers;
    this.user = req.user;
  }

  async appendBoard() {
    const userNo = this.user.no;
    const {categoryNo, content} = this.body;

    const error = await BoardRepository.checkCategoryNo(categoryNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 카테고리 번호는 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    const response = await BoardRepository.apppendBoard(
      userNo,
      categoryNo,
      content
    );

    const newBoard = await BoardRepository.findOneBoardWithNicknameAndLoveCount(
      response[0].insertId
    );

    return {board: newBoard[0][0], statusCode: 201};
  }

  async deleteBoard() {
    const userNo = this.user.no;
    const boardNo = this.params.boardNo;

    const error = await BoardRepository.checkBoardNo(boardNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시글은 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    const checkUserNo = await BoardRepository.checkBoardOwner(boardNo);

    if (userNo !== checkUserNo[0][0].userNo) {
      return {
        error: "Forbidden",
        message: "자신이 쓴 게시글만 삭제 할 수 있습니다.",
        statusCode: 403,
      };
    }

    await BoardRepository.deleteBoard(boardNo);

    return {message: "정상적으로 삭제됐습니다.", statusCode: 200};
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

    let error = await BoardRepository.checkBoardNo(boardNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시글은 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    error = await BoardRepository.checkCategoryNo(categoryNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 카테고리는 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    const checkUserNo = await BoardRepository.checkBoardOwner(boardNo);

    if (userNo !== checkUserNo[0][0].userNo) {
      return {
        error: "Forbidden",
        message: "자신이 쓴 게시글만 수정 할 수 있습니다.",
        statusCode: 403,
      };
    }

    await BoardRepository.updateBoard(boardNo, categoryNo, content);

    const newBoard = await BoardRepository.findOneBoardWithNicknameAndLoveCount(
      boardNo
    );

    return {board: newBoard[0][0], statusCode: 200};
  }
}
