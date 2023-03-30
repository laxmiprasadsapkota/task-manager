const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const Task = require("../models/taskModel");
const router = express.Router();


// another way to optimise code by appending get and post
// router.route("/").get(getTasks).post(createTask)


//Create a Task
router.post("/", createTask);

//Get.Read Tasks
router.get("/", getTasks);

//Get/Read single Task
router.get("/:id", getTask);

//delete single Task
router.delete("/:id", deleteTask);

//update single Task(put for update entire record and patch for update one or more attributes in record)
router.put("/:id", updateTask);

module.exports = router;
