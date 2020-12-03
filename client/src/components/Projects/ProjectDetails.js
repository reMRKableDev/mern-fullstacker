import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

import AddTaskForm from "../Tasks/Form/AddTaskForm";
import EditProjectForm from "./Forms/EditProjectForm";
import ProjectService from "../../services/project-service";

const ProjectDetails = (props) => {
  const [details, setDetails] = useState({});

  // function to make api call to the backend to retrieve a single object from the database
  const getSingleProject = () => {
    // get the 'id' from url via 'props.match.params' object
    const { id } = props.match.params;

    const service = new ProjectService();

    // api call to the server to retrieve a single object
    service
      .getOneProject(id)
      .then((responseFromApi) => {
        setDetails(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  // useEffect to mimic componentDidMount(). It'll get run anytime there is any change to the props.match.params value coming in.
  useEffect(getSingleProject, [props.match.params]);

  // function to render the edit form.
  const renderEditForm = () => {
    // Check if there is some value in the details state
    if (!details.title) {
      // run the api call if the state isn't filled
      getSingleProject();
    } else {
      // render the edit form
      // pass down the details from state as props to form, in order to edit
      // pass down the project
      return (
        <EditProjectForm
          theProject={details}
          getTheProject={getSingleProject}
          {...props}
        />
      );
    }
  };

  // function to delete the project
  const deleteProject = () => {
    // get the 'id' from url via 'props.match.params' object
    const { id } = props.match.params;

    const service = new ProjectService();

    // api call to the delete route in the backend
    service
      .removeProject(id)
      .then(() => {
        // after submitting the form, 'props.history.push' can be used to redirect to 'projects'
        props.history.push("/projects");
      })
      .catch((error) => console.error(error));
  };

  // function to render add task form
  const renderAddTaskForm = () => {
    if (!details.title) {
      getSingleProject();
    } else {
      // pass the project and method getSingleProject() as a props down to AddTask component
      return (
        <AddTaskForm theProject={details} getTheProject={getSingleProject} />
      );
    }
  };

  const ownershipCheck = (project) => {
    if (props.loggedInUser && project.owner === props.loggedInUser._id) {
      return (
        <div>
          <div>{renderEditForm()} </div>
          <button onClick={() => deleteProject(details._id)}>
            Delete project
          </button>
        </div>
      );
    }
  };

  return (
    <div className="projects-list">
      <h3>{details.title}</h3>
      <p>{details.description}</p>
      <img src={details.imageUrl} alt="project" />
      {ownershipCheck(details)}
      <br />
      <div>{renderAddTaskForm()} </div>
      <br />
      <br />
      <Link to="/projects">Back to projects</Link>
    </div>
  );
};

export default ProjectDetails;
