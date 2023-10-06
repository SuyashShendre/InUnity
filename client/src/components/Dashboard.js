import React, { useState, Fragment, useEffect } from "react";
import AddTaskForm from "./forms/AddTaskForm";
import EditTaskForm from "./forms/EditTaskForm";
import UserTable from "./table/UserTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../common";

const Dashboard = () => {

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await axios.get(`${baseUrl}/tasks`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
      });
      setTasks(data.data.data)
    } catch (error) {
      if (error.response.data) {
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  const initialFormState = { id: null, title: "", body: "", color: "" };

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const addTask = task => {
    task.id = tasks.length + 1;
    setTasks([...tasks, task]);
  };

  const deleteTask = async (id) => {
    setEditing(false);
    try {
      await axios.delete(
        `${baseUrl}/tasks/${id}`,
        { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` } }
      );
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const updateTask = (id, updatedTask) => {
    setEditing(false);
    setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
  };

  const editRow = task => {
    setEditing(true);
    setCurrentTask({
      id: task._id,
      title: task.title,
      body: task.body,
      color: task.color,
    });
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Manage Task</h1>
        <div><button className="rounded" onClick={Logout}>Logout</button></div>
      </div>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit Task</h2>
              <EditTaskForm
                editing={editing}
                setEditing={setEditing}
                currentTask={currentTask}
                updateTask={updateTask}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add Task</h2>
              <AddTaskForm addTask={addTask} />
            </Fragment>
          )}
        </div>
        <br />
        <div className="flex-large">
          <h2>View Tasks</h2>
          <UserTable tasks={tasks} editRow={editRow} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
