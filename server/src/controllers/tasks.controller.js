const taskModel = require("../models/tasks.model");
const userModel = require("../models/users.model");

const createTask = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user._id;

    const task = await taskModel.findOne({
      $and: [{ user: userId }, { title }],
    });
    if (!task) {
      if (title && body) {
        req.body.user = userId;
        const creatingTask = new taskModel(req.body);
        await creatingTask.save();

        return res.status(201).send({
          success: true,
          message: `Task added successfully`,
          data: creatingTask,
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Task already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Task",
      error,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user._id;

    const task = await taskModel.find({ user: userId });

    return res.status(200).send({
      success: true,
      message: "Get all Tasks",
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Geting Task",
      error,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, body, color } = req.body;
    const userId = req.user._id;
    const taskId = req.params.id;

    const user = await userModel.findById(userId);

    const task = await taskModel.findById(taskId);

    if (user._id.toString() !== task.user.toString()) {
      return res.status(401).send({
        success: true,
        message: "You are not authorize for this process",
      });
    }

    if (!user) {
      res.status(400).send({
        success: true,
        message: "User not exists",
      });
    }

    if (!task) {
      res.status(400).send({
        success: true,
        message: "Task already deleted",
      });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Task Upated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Task",
      error,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id;

    const user = await userModel.findById(userId);

    const task = await taskModel.findById(taskId);

    if (!user) {
      res.status(400).send({
        success: true,
        message: "User not exists",
      });
    }

    if (!task) {
      res.status(400).send({
        success: true,
        message: "Task already deleted",
      });
    }

    if (user._id.toString() !== task.user.toString()) {
      res.status(400).send({
        success: true,
        message: "You are not authorize for this process",
      });
    }

    await task.deleteOne({ taskId });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Task",
      error,
    });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
