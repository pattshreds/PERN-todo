import React, { useState, useEffect } from 'react';
import EditTodo from './EditTodo.js';
import axios from 'axios';
import InputTodo from './InputTodo.js';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        const res = await axios.get('http://localhost:3000/todos');
        setTodos(res.data);
    };

    useEffect(() => {
        getTodos();
    }, []);

    const deleteTodo = async (id) => {
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
        });
        setTodos(todos.filter((todo) => todo.todo_id !== id));
    };

    return (
        <>
            <InputTodo onAddTodo={getTodos} />
            <table className='table mt-5'>
                <thead>
                    <tr>
                        <th scope='col'>Description</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ListTodos;
