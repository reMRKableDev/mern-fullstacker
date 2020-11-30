import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import ProjectList from "../Projects/ProjectList";
import ProjectDetails from "../Projects/ProjectDetails";
import TaskDetails from "../Projects/TaskDetails";

function App() {
  return (
    <section className="App">
      <Navbar />
      <Switch>
        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/projects/:id" component={ProjectDetails} />
        <Route path="/projects/:id/tasks/:taskId" component={TaskDetails} />
      </Switch>
    </section>
  );
}

export default App;
