const express = require("express");
const { Todo } = require("../models");
const router = express.Router();
//models에 시퀄라이즈가 연결되있어서 models를 불러옴 그래야 mysql과 연결되기 때문에

//기본주소: localhost:PORT/
// GET localhost:PORT/todos - show all todos (READ) - 만든 데이터를 가져온다
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
    console.log(newTodo);
    res.send(newTodo);
  } catch (err) {
    res.send(err);
  }
});

// PATCH localhost:PORT/todo/:todoId - edit a specific todo (UPDATE)
// 수정 성공시; true -> res.send(true)
// 수정 실패시; false -> res.send(false)
router.patch("/todo/:todoId", async (req, res) => {
  // console.log(req.body); // { title: 'my todo - 수정', done: true }
  // console.log(req.params); // { todoId: '1' }
  try {
    let [isUpdated] = await Todo.update(
      //[isUpdated] 대괄호로 묶어서 구조분해 할당을 진행함 
      //왜?  console.log(isUpdated); 했을 때 값만 나오게 하려고 맨날 슬라이싱 하는거 귀찮으니까
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: req.params.todoId,
        },
      }
    );
    console.log(isUpdated);
    // 수정 성공시; [ 1 ] -> 1
    // 수정 실패시; [ 0 ] -> 0

    // !0 수정 실패
    if (!isUpdated) {
      return res.send(false);
    }
    // 수정 성공
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/todo/:todoId", async (req, res) => {
  console.log(req.params)
  try {
    let isDeleted = await Todo.destroy({
      //여기선 구조분해 할당을 할 필요가 없다.
      where: { id: req.params.todoId },
      //삭제는 body를 가져올 필요가 없음 Id만 찾아서 해당하는 Id만 지우면 되기 때문이다.
    });

    if (!isDeleted) {
      return res.send(false);
    }
    console.log(isDeleted);
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;

//내보내기를 해야 연결이 된다 app.js에있는 todo파일부른 것과
//module따로 안만들고 여기서 다할거
