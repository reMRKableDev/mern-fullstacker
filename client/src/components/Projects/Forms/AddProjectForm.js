import React, { useState } from "react";

import UploadService from "../../../services/upload-service";
import ProjectService from "../../../services/project-service";

const initialState = { title: "", description: "", imageUrl: "" };

const AddProjectForm = (props) => {
  const [formState, setFormState] = useState(initialState);

  const service = new UploadService();

  // Function handler for input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Function to uploading a file
  const handleFileUpload = (event) => {
    // Creates a new FormData object that will take the file upload data
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    // upload the data to cloudinary
    service
      .upload(uploadData)
      .then((response) => {
        // The response from uploading to cloudinary is the url which will be saved in the database.
        setFormState({ ...formState, imageUrl: response.cloudinaryUrl });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // Function handler for form submission
  const handleFormSubmit = (event) => {
    // Prevent default form action
    event.preventDefault();

    // Extract values to use with axios call
    const { title, description, imageUrl } = formState;

    const service = new ProjectService();

    // Make api call to the backend to save form data
    service
      .createProject({ title, description, imageUrl })
      .then(() => {
        props.getData();
        setFormState(initialState);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Add New Project</h2>
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

        <label htmlFor="imageUrl">Description:</label>
        <input type="file" name="imageUrl" onChange={handleFileUpload} />

        {formState.imageUrl ? (
          <button type="submit">Submit</button>
        ) : (
          <button disabled type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProjectForm;
