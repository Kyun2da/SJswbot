import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`현재 포트 http://localhost:${port}에서 구동중입니다.`);
});
