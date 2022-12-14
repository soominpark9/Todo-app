//1. 함수형 컴포넌트
//2. input(checkbox) 와 label을 랜더링하는 컴포넌트
//3. App (부모 컴포넌트)에서 Todo (자식 컴포넌트) 1개를 랜더링한다.
import { useState } from "react";
import '../styles/Todo.scss'

const Todo = ({ item, deleteItem }) => {
  //APP.JS에서 props를 가져옴
  //console.log(items) -{id:1, title: 'todo1', true}
  // const {items,deleteItem} = props 하고 원래 (props) 해줘야하는데
  // props자리에 ( items,deleteItem를 넣어서 구조분해 할당 안해도됨

  const { id, done } = item;
  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);
  //const { id, items, done } = items; 얘를 여기서 구조 분해 할당을 안하면
  //밑에서 todo${item.id} 이렇게 쓰면된다
  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
    //delete클릭할때 마다 현재 삭제될게 뭔지 알려줌 todoItem 얘임
  };

  //title input 커서가 깜빡인다고해서 편집이 되는것은 아니기때문에
  //사용자가 키보드 입력할 때 마다 title을 새 값으로 변경해줘야한다 setTodoItem 활용
  const editEventHandler = (e) => {
    const { title, ...rest } = todoItem; //rest에는 id랑 done이 들어간다
    setTodoItem({
      title: e.target.value,
      ...rest,
      //...rest를 썼기 때문에 title제외 나머지 정보가 다 저기 함축되어있어서 반영된다
    });
  };

  //title input 클릭시 : readOnly state를 false로 변경
  const offReadonlyMode = () => {
    setReadOnly(false);
  };

  //title input에서 enter키 입력시 (title 수정을 완료했다) -> readOnly state를 true로 변경
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
    }
  };
  //checkbox 업데이트
  //done: true -> false, fasle -> true로 토글느낌으로
  const checkboxEventHandler = (e) => {
    // rest: id, title 정보
    const { done, ...rest } = todoItem; // { id: 1, title: 'todo1', done: false, }
    setTodoItem({
      done: e.target.checked,
      ...rest,
    });
  };

  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${id}`}
        name={`todo${id}`}
        value={`todo${id}`}
        // onChange={checkBoxEventHandler}
        defaultChecked={done}
        onChange={checkboxEventHandler}
      />
      {/* <label htmlFor={`todo${id}`}>{title}</label> */}
      <input
        type="text"
        value={todoItem.title} //상태로 관리되야하기때문에 초기값.title로 해줘야한다
        onChange={editEventHandler}
        onClick={offReadonlyMode}
        onKeyPress={enterKeyEventHandler}
        readOnly={readOnly}
      />
      <button onClick={onDeleteBtnClick}>DELETE</button>
      {/* 여기서 Mytodo 가 데이터 받는 곳 -> react에서 데이터는 부모에서 -> 
      자식으로 흐르기때문에 부모요소인 app.js에 데이터를 받는다 */}
    </div>
  );
};

export default Todo;
