import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import TaskService from "../../services/task-service";

const TaskDetails = (props) => {
  const [taskDetails, setTaskDetails] = useState({});

  // function to make api call to the backend
  const getTheTask = () => {
    const { taskId, id } = props.match.params;

    const service = new TaskService();

    service
      .getOneTask(id, taskId)
      .then((responseFromApi) => {
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
