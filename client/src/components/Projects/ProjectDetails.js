import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import EditProjectForm from "./Forms/EditProjectForm";
import AddTaskForm from "./Forms/AddTaskForm";

const ProjectDetails = (props) => {
  const [details, setDetails] = useState({});

  // function to make api call to the backend to retrieve a single object from the database
  const getSingleProject = () => {
    // get the 'id' from url via 'props.match.params' object
    const { id } = props.match.params;

    // api call to the server to retrieve a single object
    axios
      .get(`http://localhost:5000/api/projects/${id}`)
      .then((responseFromApi) => {
        console.log(responseFromApi);
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

    // api call to the delete route in the backend
    axios
      .delete(`http://localhost:5000/api/projects/${id}`)
      .then((results) => {
        // after submitting the form, 'props.history.push' can be used to redirect to 'projects'
        props.history.push("/projects");
      })
      .catch((error) => console.error(error));
  };

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

  return (
    <div>
      <h1>{details.title}</h1>
      <p>{details.description}</p>
      {/* show the task heading only if there are tasks */}
      {details.tasks && details.tasks.length > 0 && <h3>Tasks </h3>}

      {/* map through the array of tasks and... */}
      {details.tasks &&
        details.tasks.map((task, index) => {
          return (
            <div key={index}>
              {/* ... make each task's title a link that goes to the task details page */}
              <Link to={`/projects/${details._id}/tasks/${task._id}`}>
                {task.title}
              </Link>
            </div>
          );
        })}
      <div>{renderEditForm()}</div>
      <button onClick={() => deleteProject()}>Delete Project</button>
      <br />
      <div>{renderAddTaskForm()} </div>
      <br />
      <br />
      <Link to="/projects">Back to projects</Link>
    </div>
  );
};

export default ProjectDetails;
