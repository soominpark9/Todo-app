const express = require("express");
const { Todo } = require("../models");
const router = express.Router();
//models에 시퀄라이즈가 연결되있어서 models를 불러옴 그래야 mysql과 연결되기 때문에

//기본주소: localhost:PORT/

//GET localhost:PORT/todo - show all todos (READ) - 만든 데이터를 가져온다

// GET localhost:PORT/todos - show all todos (READ)
router.get("/todos", async (req, res) => {
  // Todo.findAll().then((data) => {
  //   res.send(data);
  // });

  try {
    let data = await Todo.findAll();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// localhost:PORT/todo - create a new todo(CREATE)
router.post("/todo", async (req, res) => {
  try {
    let newTodo = await Todo.create({
      title: req.body.title,
      //done은 안해줘도 된다 이미 데이터베이스에서 기본값 0 을 지정해뒀기 때문에
      //id는 알다시피 이미 자동증가를해놔서 안써도됨
    });
    res.send(newTodo);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
//내보내기를 해야 연결이 된다 app.js에있는 todo파일부른 것과
//module따로 안만들고 여기서 다할거
