import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskDetails = (props) => {
  const [taskDetails, setTaskDetails] = useState({});

  // function to make api call to the backend
  const getTheTask = () => {
    const { taskId, id } = props.match.params;

    axios
      .get(`http://localhost:5000/api/projects/${id}/tasks/${taskId}`)
      .then((responseFromApi) => {
        console.log(responseFromApi);
        setTaskDetails(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(getTheTask, [props.match.params]);

  return (
    <div>
      <h1>{taskDetails.title}</h1>
      <p>{taskDetails.description}</p>
      <br />
      <Link to={`/projects/${props.match.params.id}`}>
        Back to parent project
      </Link>
    </div>
  );
};

export default TaskDetails;
