const { Router } = require("express");
const mongoose = require("mongoose");
const Task = require("../models/task.model");
const Project = require("../models/project.model");

const router = Router();

// GET route => to retrieve a specific task
router.get("/projects/:projectId/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;

  // Find a task by a given task id.
  Task.findById(taskId)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// GET route => to retrieve all tasks
router.get("/tasks", (req, res) => {
  // Find a task by a given task id.
  Task.find()
    .populate("project")
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// POST route => to create a new task
router.post("/tasks", (req, res) => {
  const { title, description, projectId } = req.body;
  console.log(req.body);

  Task.create({
    title,
    description,
    project: projectId,
  })
    .then((response) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: response._id },
      });
    })
    .then((theResponse) => {
      res.status(200).json(theResponse);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// PUT route => to update a specific task
router.put("/tasks/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Task with ${id} is updated successfully.`,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// DELETE route => to delete a specific task
router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({
        message: `Task with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
