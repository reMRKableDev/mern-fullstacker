import React, { useState } from "react";

import ProjectService from "../../../services/project-service";

const EditProjectForm = (props) => {
  const [formState, setFormState] = useState({
    title: props.theProject.title,
    description: props.theProject.description,
  });

  // Function handler to submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // form state data to pass with the api call
    const { title, description } = formState;

    const service = new ProjectService();

    service
      .updateProject(props.theProject._id, {
        title,
        description,
      })
      .then(() => {
        // run method to call api method to get a single project
        props.getTheProject();
      })
      .catch((error) => console.error(error));
  };

  // Function handler to monitor the new changes in the inputs
  const handleInputChange = (event) => {
    // Data from the input field
    const { name, value } = event.target;

    // Set new form data
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      <hr />
      <h3>Edit form</h3>
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

export default EditProjectForm;
