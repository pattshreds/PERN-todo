import React, {useState} from 'react';

const EditTodo = ({todo}) => {
  const [description, setDescription] = useState(todo.description);

  // Edit Function //
  const editText = async (id) => {
    const body = {description}
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    });
      window.location = '/';
  };

  return(
    <>
      {/* Modal */}
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target={`#id${todo.todo_id}`}
          onClick={() => setDescription(todo.description)}
          >
          Edit
        </button>
        <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
        <div className="modal-content">

      {/* Modal Header */}
        <div className="modal-header">
          <h4 className="modal-title">Edit Item</h4>
          <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
        </div>

      {/* Modal Body */}
        <div className="modal-body">
          <input type="text" className="form-control" value={description} onChange={event => setDescription(event.target.value)} />
        </div>

      {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-warning"
            data-dismiss="modal"
            onClick={() => editText(todo.todo_id)}
            >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
            onClick={() => setDescription(todo.description)}
            >
            Close
          </button>
        </div>
    </div>
  </div>
</div>
    </>
  )
};

export default EditTodo;
