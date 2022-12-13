//1. 함수형 컴포넌트
//2. input(checkbox) 와 label을 랜더링하는 컴포넌트
//3. App (부모 컴포넌트)에서 Todo (자식 컴포넌트) 1개를 랜더링한다.
import {useState} from 'react';

const Todo = ({ item, deleteItem }) => {
  //APP.JS에서 props를 가져옴
  //console.log(items) -{id:1, title: 'todo1', true}
  // const {items,deleteItem} = props 하고 원래 (props) 해줘야하는데
  // props자리에 ( items,deleteItem를 넣어서 구조분해 할당 안해도됨

  const { id, title, done } = item;
  const[todoItem, setItem] = useState(item);
  //const { id, items, done } = items; 얘를 여기서 구조 분해 할당을 안하면
  //밑에서 todo${item.id} 이렇게 쓰면된다
  const onDeleteBtnClick = () => {
    deleteItem(todoItem);
    //delete클릭할때 마다 현재 삭제될게 뭔지 알려줌 todoItem 얘임
  };
  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${id}`}
        name={`todo${id}`}
        value={`todo${id}`}
        defaultChecked={done}
      />
      <label htmlFor={`todo${id}`}>{title}</label>
      <button onClick={onDeleteBtnClick}>DELETE</button>
      {/* 여기서 Mytodo 가 데이터 받는 곳 -> react에서 데이터는 부모에서 -> 자식으로 흐르기때문에 부모요소인 app.js에 데이터를 받는다 */}
    </div>
  );
};

export default Todo;
