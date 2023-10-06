const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

//Create Task || POST
router.post("/", auth, createTask);

//Get All Task || GET
router.get("/", auth, getTasks);

//Update Task || PUT
router.put("/:id", auth, updateTask);

//Delete Task || DELETE
router.delete("/:id", auth, deleteTask);

module.exports = router;
