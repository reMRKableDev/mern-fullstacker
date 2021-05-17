const { Router } = require("express");
const mongoose = require("mongoose");

const Project = require("../models/project.model");
const Task = require("../models/task.model"); // <== !!!

const router = Router();

/* POST - creates a new project */
router.post("/projects", (req, res) => {
  const { title, description, imageUrl } = req.body;

  Project.create({
    title,
    description,
    imageUrl,
    tasks: [],
    owner: req.user._id, // Add this after finishing authentication
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* GET - retrieves all the projects from the database */
router.get("/projects", (req, res) => {
  Project.find()
    .populate("tasks")
    .then((allTheProjects) => {
      res.status(200).json(allTheProjects);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* GET route => to get a specific project/detailed view */
router.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Our projects have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  Project.findById(id)
    .populate("tasks")
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

/* PUT route => to update a specific project */
router.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Project with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// DELETE route => to delete a specific project
router.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({
        message: `Project with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
