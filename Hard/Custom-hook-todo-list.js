import {useState, useRef, useEffect} from 'react';
export const useTodoList = () => {
  // Write the body of your hook here
  const [todos, setTodos] = useState(()=>{
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);

  const addTodo =(item)=>{
    setTodos((prevTodos)=>{
      return [...prevTodos, {
      "id": todos.length+1,
      "text":item,
      "completed":false
      }];
    });
  }

  const removeTodo =(id)=>{
    const newTodos = todos.filter((item)=>{
      return item.id !==id;
    });
    setTodos(newTodos);
  }

  const toggleTodo = (id)=>{
    const newItem= todos.map((item)=>{
      if(item.id==id){
        return {
          "id":item.id,
          "text":item.text,
          "completed":!item.completed
        }
      } else{
        return item;
      }
    });
    setTodos(newItem);
    
  }
  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo
  };
};

const App = () => {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodoList();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(e.target.elements.todoText.value);
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todoText" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? 'Incomplete' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;