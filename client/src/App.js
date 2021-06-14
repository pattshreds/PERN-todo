import './App.css';
import InputTodo from './components/InputTodo.js';
import ListTodos from './components/ListTodos.js'
import React from 'react';

function App() {
  return (
    <>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
