import {useState, useRef} from 'react';
const App = () => {
  // Edit this component
  const [todoList,setTodoList] = useState([]);
  const userInput = useRef(null);
  const handleList=()=>{
    const value=userInput.current.value;
    setTodoList((prevTodoList)=>{
      return [...prevTodoList, ...[value]];
    });
    userInput.current.value=null;

  }
  console.log(todoList)
  return (
    <div>
      <input data-testid="input-id" ref={userInput} />
      <button data-testid="button-id" onClick={handleList}>Add a todo</button>
      <ul data-testid="ul-id">
      {todoList.map(item=> <li>{item}</li>)}
      </ul>
    </div>
  )
}

export default App