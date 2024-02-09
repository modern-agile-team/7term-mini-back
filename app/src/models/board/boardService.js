import BoardRepository from "./boardRepository.js";

export default class BoardService {
  constructor(data) {
    this.body = data.body;
    this.params = data.params;
    this.headers = data.headers;
    // console.log(data.headers["user-no"]);
  }

  async appendBoard() {
    // console.log(this.headers.user_no);
    // console.log(this.body);
    const userNo = this.headers.user_no;
    const {categoryNo, content} = this.body;

    if (!userNo) {
      return {
        error: "Bad Request",
        message: "생성시 유저 고유 번호가 있어야합니다.",
        statusCode: 400,
      };
    }

    if (!categoryNo) {
      return {
        error: "Bad Request",
        message: "생성시 카테고리 번호가 있어야합니다.",
        statusCode: 400,
      };
    }

    if (!content) {
      return {
        error: "Bad Request",
        message: "생성시 게시글의 내용이 있어야합니다.",
        statusCode: 400,
      };
    }

    if ([...content].length > 250) {
      //이모지를 세려면 이렇게 사용해야함..
      return {
        error: "Bad Request",
        message: "생성시 게시글의 내용은 250자 이내여야 합니다.",
        statusCode: 400,
      };
    }

    const response = await BoardRepository.apppendBoard(
      userNo,
      categoryNo,
      content
    );

    console.log(response[0].insertId);

    const get = await BoardRepository.getBoard(response[0].insertId);
    console.log(get[0][0]);
    console.log(new Date());

    if (response[0].affectedRows) return {message: "Created", statusCode: 201};
  }

  async deleteBoard() {
    const boardNo = this.params.boardNo;

    if (!boardNo) {
      return {
        error: "Bad Request",
        message: "삭제할 게시글 번호가 있어야 합니다.",
        statusCode: 400,
      };
    }

    const response = await BoardRepository.deleteBoard(boardNo);

    if (response[0].affectedRows) {
      return {message: "정상적으로 삭제됐습니다.", statusCode: 200};
    } else if (response[0].affectedRows === 0) {
      return {message: "해당 게시물은 없습니다.", statusCode: 11};
    }
  }

  async getBoard() {
    // console.log(this.params);
    const boardNo = this.params.boardNo;
    const key = await BoardRepository.getBoard(boardNo);
    const [rows, fields] = await BoardRepository.getBoard(boardNo);

    if (!rows[0].no) {
      return {
        error: "Not Found",
        message: "해당 번호의 게시물은 존재하지 않습니다.",
        statusCode: 404,
      };
    }

    return {statusCode: 201, board: rows[0]};
  }

  async updateBoard() {
    // console.log(this.params.boardNo);
    // console.log(this.body.content);
    const boardNo = this.params.boardNo;
    const content = this.body.content;
    let response = {};
    if (!content) {
      response = {message: "수정할 내용을 입력해 주세요"};
    }
    response = await BoardRepository.updateBoard(boardNo, content);

    // const response = await instance.updateBoard();
    return response;
  }
}
