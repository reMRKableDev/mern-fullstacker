import axios from "axios";

class TaskService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  // Create new task
  createTask = (data) => {
    return this.service.post("/api/tasks", data).then((response) => response);
  };

  // Get a specific task
  getOneTask = (projectId, taskId) => {
    return this.service
      .get(`/api/projects/${projectId}/tasks/${taskId}`)
      .then((response) => response);
  };
}

export default TaskService;
