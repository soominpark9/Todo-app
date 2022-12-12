import Todo from "./components/Todo";
import { useState } from "react";


const App = () => {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: 'My Todo1',
      done: false,
    },
    {
      id: 2,
      title: 'My Todo2',
      done: false,
    },
    {
      id: 3,
      title: 'My Todo3',
      done: true,
    },
  ]);

  return (
    <div className="App">
      {todoItems.map((item) => {
        // console.log(item); // {id: 1, title: 'My Todo1', done: false}
        return <Todo key={item.id} item={item} />;
        //이제 여기서 Todo.js로 props를 넘겨준다 여기서 props는 item이다
      })}
    </div>
  );
};

export default App;
