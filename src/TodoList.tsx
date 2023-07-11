import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: string[];
  onComplete: (index: number) => void;
  onDelete: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete, onDelete }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} onComplete={() => onComplete(index)} onDelete={() => onDelete(index)} />
      ))}
    </ul>
  );
};

export default TodoList;
