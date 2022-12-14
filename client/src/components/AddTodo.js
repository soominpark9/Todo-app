//1. 함수형 컴포넌트
//2. input과 button을 가짐
import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/AddTodo.scss";

const AddTodo = (props) => {
  const { addItem } = props;
  //const { addItem } = props; 안쓰고 간략하게 하려면 위의props란에 바로 addItem을 넣으면됨

  //사용자 입력을 저장할 객체
  //(id, title, done에 대한 정보를 저장해야해서 객체 형태로 !!)
  const [todoItem, setTodoItem] = useState({
    title: "",
  });
  //props 받아와야함
  //상태가 필요함

  const onButtonClick = () => {
    //props로 받아온 additem 함수 실행
    addItem(todoItem); //{title : 'input입력값'}
    //newItem으로 넘겨줌
    setTodoItem({ title: "" });
  };
  //enter키 입력시 아이디 추가
  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      onButtonClick();
    }
  };
  return (
    <div className="AddTodo">
      <input
        type="text"
        placeholder="Add your new Todo"
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
        onKeyPress={onEnterKeyPress}
      />
      <button onClick={onButtonClick}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default AddTodo;
