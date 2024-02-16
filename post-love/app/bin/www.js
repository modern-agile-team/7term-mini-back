import app from "../app.js";
("user strict");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버가 가동됐습니다.`);
});
