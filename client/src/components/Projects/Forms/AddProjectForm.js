import React, { useState } from "react";
import axios from "axios";

const initialState = { title: "", description: "" };

const AddProjectForm = (props) => {
  const [formState, setFormState] = useState(initialState);

  // Function handler for input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Function handler for form submission
  const handleFormSubmit = (event) => {
    // Prevent default form action
    event.preventDefault();

    // Extract values to use with axios call
    const { title, description } = formState;

    // Make api call to the backend to save form data
    axios
      .post("http://localhost:5000/api/projects", { title, description })
      .then(() => {
        props.getData();
        setFormState(initialState);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
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
  );
};

export default AddProjectForm;
