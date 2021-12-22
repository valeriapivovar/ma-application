import React, { useState, useEffect } from 'react';
import { Card, Divider, Button } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';
import TodoistApi from '../helpers/TodoistApi';

export const ToDo = (props) => {
  const [todos, setTodos] = useState(props.list);
  const [idCount, setIdCount] = useState(10);

  const Todos = new TodoistApi();

  useEffect(() => {
    setTodos(props.list);
  }, [props.list]);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">
        <div className="control-row">
          Amount of unchecked tasks: {(todos.filter(todo => todo.checked ===false)).length}
          <Button onClick = {removeAllCheckedItems} type="primary">Delete selected</Button>
        </div>
        {
          todos.map(todo => <ToDoItem
            key={todo.id}
            item={todo}
            description = {todo.description}
            onRemove={onRemove}
            onCheck={onCheck}
            onEdit={onEdit}
            toggleEdit={toggleEdit}
          />)
        }
      </ul>
    )
  }


  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    Todos.closeTask(todos[index].id);

    if (index !== -1) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }

  const removeAllCheckedItems = () => {
    const itemsToDelete = todos.filter(item => item.checked);

    itemsToDelete.forEach(item => {
      Todos.closeTask(item.id);
    })
    setTodos(todos.filter(item => !item.checked));
  }

  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      const todo = todos[index];

      todo.checked = !todo.checked;
      todos.splice(index, 1, todo);

      setTodos([...todos]);
    }
    
  }

  const toggleEdit = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      const todo = todos[index];

      todo.edited = !todo.edited;

      setTodos([...todos]);
    }
  }

  const onEdit = (id, name) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      const todo = todos[index];

      todo.edited = !todo.edited;
      todo.content = name;

      Todos.updateTasks(todo.id, todo.content);

      setTodos([...todos]);
    }
  }

  const onSubmit = (title, description) => {
    const todo = {
      id: idCount,
      title,
      description,
      checked: false
    };

    setTodos([...todos, todo]);
    setIdCount(idCount + 1);
  }

  return (
    <Card title={'My todos'} className="todo-card">
      <ToDoForm onSubmit={onSubmit} />
      <Divider />
      {
        renderTodoItems(todos)
      }
    </Card>
  );
}
