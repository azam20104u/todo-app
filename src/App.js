import React,{useState, useRef, useEffect} from 'react'
import TodoList from './TodoList.js';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos]=useState([]);
  const todoNameRef = useRef();

  useEffect(()=>{
    const storedTodos =JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log('useEffect[]',storedTodos);
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    console.log('useEffect[todos]',todos.length);
      // if(todos.length>0)
      console.log('inside if todos.length');
      localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
   
  },[todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo=> todo.id===id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name==='') return
    setTodos((prevTodos)=>{
      return [...prevTodos, {id:prevTodos.length,name:name, complete: false}]
    });
    todoNameRef.current.value=null
  }
  function handleClearTodos(){
    const newTodos = todos.filter(todo=> !todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div>{todos.filter(todo=>!todo.complete).length} left to do</div>
    </>
  );
}

export default App;
