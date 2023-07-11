import React from 'react';
import styles from './TodoItem.module.css';
import Todo from './TodoEntity';

interface TodoItemProps {
  todo: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onComplete, onDelete }) => {
  return (
    <li className={styles.todoItem}>
      <span>{todo.todo}</span>
      <div className={styles.buttonContainer}>
        <button className={styles.completeButton} onClick={onComplete}>
          Complete
        </button>
        <button className={styles.deleteButton} onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
