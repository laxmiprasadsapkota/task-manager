import { FaCheckDouble, FaRegTrashAlt, FaEdit } from "react-icons/fa";

const Task = ({ task, index, deleteTask, getSingleTask, updateStatus }) => {
  return (
    <div className={task.status ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => updateStatus(task)} />
        <FaEdit color="purple" onClick={() => getSingleTask(task)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  );
};

export default Task;
