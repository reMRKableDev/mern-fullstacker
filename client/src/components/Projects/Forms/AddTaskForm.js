import React, { useState } from "react";
import axios from "axios";

const initialState = {
  title: "",
  description: "",
  isShowing: false, // will help with toggling form
};

const AddTaskForm = (props) => {
  const [formState, setFormState] = useState(initialState);

  // function handler to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // function handler to submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { title, description } = formState;
    const projectId = props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
    // it has to be the 'id' because we are referencing project
    // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})

    // { title, description, projectId } => this is 'req.body' that will be received on the server side in this route,

    axios
      .post(`/api/tasks`, { title, description, projectId })
      .then(() => {
        props.getTheProject();
        setFormState(initialState);
      })
      .catch((error) => console.error(error));
  };

  // function handler to toggle the form
  const toggleForm = () =>
    !formState.isShowing
      ? setFormState({ ...formState, isShowing: true })
      : setFormState({ ...formState, isShowing: false });

  return (
    <div>
      <hr />
      <button onClick={() => toggleForm()}>Add Task</button>

      {formState.isShowing && (
        <div>
          <h3>Add Task</h3>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleInputChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleInputChange}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
