const express = require("express");
const app = express();
const PORT = 8099;
const todoRouter = require('./routes/todo')
//위에 문장 하나로 routes에 있는 todo.js파일과 연겯됨

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', todoRouter) //기본주소: localhost:PORT/

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/todos`);
});
