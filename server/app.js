const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const todoRouter = require("./routes/todo");
//위에 문장 하나로 routes에 있는 todo.js파일과 연겯됨

//미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //모든 서버에서 보내는 요청 수락
app.use("/", todoRouter); // 기본주소 " localhost:PORT/api"
//순서중요 라우터가 가장밑에있어야한다 cors가 라우터 보다 위에있어야 작동됨

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
