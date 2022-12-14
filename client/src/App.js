import { useState, useRef } from "react";
//사실 디비에서 데이터가져올거면 useRef 쓸 필요가 없다는...........?ㅎ
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import "./styles/App.scss";

const App = () => {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "My Todo1",
      done: false,
    },
    {
      id: 2,
      title: "My Todo2",
      done: false,
    },
    {
      id: 3,
      title: "My Todo3",
      done: true,
    },
  ]);

  const todoId = useRef(4);
  //todoId를 useRef로 관리하기 위해서 썼는데 useRef는 dom요소 접근뿐만아니라
  // 변수로도 사용할 수 있어서 여기선 위에 예시 배열에 id가 3번까지만있어서 4번 부터 추가해야해서
  // 변수를 4부터 시작했다

  // AddTodo 컴포넌트는 상위 컴포넌트(App)의 todoItems(state)에 접근 불가능
  // 상위 컴포넌트(App)은 AddTodo 컴포넌트 접근 가능
  // => App 컴포넌트에 addItem() 함수를 정의하고, 해당 함수를 AddTodo props로 넘겨야 함
  const addItem = (newItem) => {
    //newItem 에 넘겨온 todoItem (title)이 여기로 와서 이제 title을 여기서도 찍을 수 있다>
    //매개변수 newItem을 적어줌
    // ...
    //newItem - {id:?, title:?, done:false}
    //id는 길이계산해서 title addtodo로 받아온것으로 하고 done은 기본적인걸로
    //setTodoItems() 로 보내주기??
    newItem.id = todoId.current++; //key를 위한 id설정
    //여기선 todoId를 useRef로 관리랄 하고 있어서 useRef는 current에 접근 해야 쓸수 있기 때문에 .current를 썻고
    //++는 id값이 하나씩 증가해야하기때문에 근데 db쓰면 사실상 이부분 다 필요없다함 지금 여기선 프론트라 보여주기 위해서
    newItem.done = false; //done 초기화
    //기존 todoItems를 유지하고, 새로운 newItem을 추가
    setTodoItems([...todoItems, newItem]);
  };
  //전체 Todo 리스트(todoItems)는 App 컴포넌트에서 관리하고 있으므로
  //delete() 함수는 App 컴포넌트에 작성해야함
  const deleteItem = (targetItem) => {
    //filter 매서드 이용해서 선택된 얘만 제외하고 새로운 배열로 저장되게
    //filter 매서드는 참인 애들만 남겨준다
    const result = todoItems.filter(
      (todoItem) => targetItem.id !== todoItem.id
    );
    //todoItems -> 전체 todoItem
    //filter(todoItem) -> todoItems의 각각의 원소
    //filter로 거르고 참 값만 보여준단 뜻
    //대신 (todoItem) =>여기가 다른걸로 바뀌면 !== todoItem.id 여기도 todoItem이 아닌 바뀐 값을 넣어줘야함
    setTodoItems(result);
    console.log(targetItem);
  };

  // const updateItem = (changeItem) => {};
  return (
    // AddTodo 컴포넌트 추가
    <div className="App">
      <header>😀Todo App</header>
      <AddTodo addItem={addItem} />
      <div className="left-todos">🎇{todoItems.length} Todos</div>

      {/*AddTodo 에 props로 additem을 넘겨준다  */}
      {todoItems.length > 0 ? (
        todoItems.map((item) => {
          // console.log(item); // {id: 1, title: 'My Todo1', done: false}
          return <Todo key={item.id} item={item} deleteItem={deleteItem} />;
          //deleteItem은 todo안에 있으니 여기서 보내줘야한다
          //이제 여기서 Todo.js로 props를 넘겨준다 여기서 props는 item이다
        })
      ) : (
        <p className="empty-todos">Todo를 추가해주세요🔥</p>
      )}
    </div>
  );
};

export default App;
