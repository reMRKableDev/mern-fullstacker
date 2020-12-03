import axios from "axios";

class ProjectService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true, // indicates whether or not cross-site Access-Control requests should be made using credentials
    });
  }

  // Method to retrieve all projects
  getProjects = () => {
    return this.service.get("/api/projects").then((response) => response);
  };

  // Method to retrieve a project
  getOneProject = (id) => {
    return this.service.get(`/api/projects/${id}`).then((response) => response);
  };

  // Method to delete a project
  removeProject = (id) => {
    return this.service
      .delete(`/api/projects/${id}`)
      .then((response) => response);
  };
}

export default ProjectService;
