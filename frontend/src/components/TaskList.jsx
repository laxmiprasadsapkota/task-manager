import Task from "./Task";
import TaskForm from "./TaskForm";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../App";
import { useEffect } from "react";
import loadingImg from "../assets/loader.gif";

//http://localhost:2580/api/tasks

const TaskList = () => {
  const [tasks, settasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    status: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      settasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input Field Can't be empty");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Added successfully");
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.success("Deleted Successfully");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const updateStatus = async (task) => {
    const newFormData = {
      name: task.name,
      status: true,
    };
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      toast.success("Marked as completed");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, status: false });
    setTaskID(task._id);
    setIsEditing(true);
  };

  const updateTask = async (e, task) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input Field Can't be empty");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      toast.success("Updated successfully");
      setFormData({ name: "", status: false });
      getTasks();
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.status === true;
    });
    setCompletedTasks(cTask)
  },[tasks]);
  return (
    <>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="div --flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">Please add a Task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                updateStatus={updateStatus}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default TaskList;
