import BoardRepository from "./boardRepository.js";

export default class BoardService {
  constructor(data) {
    this.body = data.body;
    this.params = data.params;
    this.headers = data.headers;
  }

  async appendBoard() {
    const userNo = this.headers.user_no;
    const {categoryNo, content} = this.body;

    let error = await BoardRepository.isUserNo(userNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 유저 고유번호는 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    error = await BoardRepository.isCategoryNo(categoryNo);

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
    const boardNo = this.params.boardNo;

    const error = await BoardRepository.isBoardNo(boardNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시글은 등록되어있지 않습니다.",
        statusCode: 404,
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

    let error = await BoardRepository.isBoardNo(boardNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시글은 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    error = await BoardRepository.isCategoryNo(categoryNo);

    if (!error[0][0]) {
      return {
        error: "Not Found",
        message: "해당 번호의 카테고리는 등록되어있지 않습니다.",
        statusCode: 404,
      };
    }

    await BoardRepository.updateBoard(boardNo, categoryNo, content);

    const newBoard = await BoardRepository.findOneBoardWithNicknameAndLoveCount(
      boardNo
    );

    return {board: newBoard[0][0], statusCode: 200};
  }
}
