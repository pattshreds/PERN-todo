import React, { useState } from 'react';

const InputTodo = ({ onAddTodo }) => {
    const [description, setDescription] = useState('');

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const body = { description };
        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            setDescription('');
            onAddTodo();
        }
    };
    return (
        <>
            <h1 className='text-center my-5'>Input todo</h1>
            <form className='d-flex' onSubmit={onSubmitForm}>
                <input
                    type='text'
                    placeholder='add todo'
                    className='form-control'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button className='btn btn-success'>Add</button>
            </form>
        </>
    );
};

export default InputTodo;
