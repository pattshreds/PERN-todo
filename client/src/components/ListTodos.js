import React, {useState, useEffect} from 'react';
import EditTodo from './EditTodo.js'

const ListTodos = () => {

  // State //
  const [todos, setTodos] = useState([])

  // Delete Function //
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    })
    setTodos(todos.filter(todo => todo.todo_id !== id))
  };

  // Get data function //
  const getTodos = async () => {
    const res = await fetch(
      'http://localhost:3000/todos'
    );
    const todoArr = await res.json();
    setTodos(todoArr)
  };

  useEffect(() => {
      getTodos();
    }, []
  );

  return (
    <>
      <table className="table mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo={todo} /></td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
};

export default ListTodos;
