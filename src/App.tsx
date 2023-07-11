import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import styles from './App.module.css';
import Todo from './TodoEntity';
import axios from 'axios';

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>();

  const handleLoad = async() => {
    const response = await axios.get(
      "https://64acda339edb4181202fe0c5.mockapi.io/todo"
    )
    setTodos(response.data)
  }
  useEffect(() => {
    handleLoad();
  }, []);

  const handleComplete = async (index: number) => {
    // get the id 
    let updatedTodos = todos[index];
    updatedTodos.todo = `✅ ${updatedTodos.todo}`;
    updatedTodos.is_done = true;
    if (updatedTodos) {
      try {
        await axios.put(
          `https://64acda339edb4181202fe0c5.mockapi.io/todo/${updatedTodos.id}`,
          {
            todo: updatedTodos.todo,
            is_done: updatedTodos.is_done,
            date: new Date(),
          }
        );
        handleLoad();
        console.log("successfully update todos");
      } catch (error) {
        console.error("Failed to update todos:", error);
      }
    }
  };

  const handleDelete = async (index: number) => {
    // get the id 
    let updatedTodos = todos[index];
    if (updatedTodos) {
      try {
        await axios.delete(
          `https://64acda339edb4181202fe0c5.mockapi.io/todo/${updatedTodos.id}`
        );
        handleLoad();
        console.log("successfully delete todos");
      } catch (error) {
        console.error("Failed to delete todos:", error);
      }
    }
  };

  const handleAddTodo = async () => {
    console.log("hello here", newTodo)
    if (newTodo != undefined && newTodo.trim() !== '') {
      const data: object = {
        todo: newTodo,
        is_done: false,
        date: new Date(),
      }
      // call api 
      const response = await axios.post("https://64acda339edb4181202fe0c5.mockapi.io/todo", data)
      setTodos([...todos, response.data]);
      setNewTodo(newTodo);
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className={styles.addButton} onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <TodoList todos={todos} onComplete={handleComplete} onDelete={handleDelete} />
    </div>
  );
};

export default App;
