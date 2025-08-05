// Dependencies =======================
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js');

// Middleware =======================
app.use(cors());
app.use(express.json()); // Allows us to access req.body

// Routes =======================

// Get all
app.get('/todos', async (req, res) => {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
});

// Get one
app.get('/todos/:id', async (req, res) => {
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
        req.params.id,
    ]);
    res.json(todo.rows);
});

// Create
app.post('/todos', async (req, res) => {
    const { description } = req.body;
    const newTodo = await pool.query(
        'INSERT INTO todo (description) VALUES ($1) RETURNING *',
        [description]
    );
    res.json(newTodo.rows);
});

// Update
app.put('/todos/:id', async (req, res) => {
    const updateTodo = await pool.query(
        'UPDATE todo SET description = $1 WHERE todo_id = $2',
        [req.body.description, req.params.id]
    );
    res.json('todo was updated');
});

// Delete
app.delete('/todos/:id', async (req, res) => {
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
        req.params.id,
    ]);
    res.json('todo was deleted');
});

// End Routes =======================

// Listener =======================
app.listen(3000, () => {
    console.log(`listening on port 3000`);
});
