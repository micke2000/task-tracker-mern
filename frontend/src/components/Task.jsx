import { useState } from "react";
import { FaArrowDown, FaTrash, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
function Task({ task }) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arrowFunc = (e) => {
    setActive(!active);
  };
  const editTask = (taskId) => {
    navigate("/edit/" + taskId);
  };
  return (
    <div className={active ? "task" : "task off"}>
      <h3>{task.name}</h3>
      <FaArrowDown onClick={arrowFunc} className="arrow" />
      <p className="date">{task.deadline}</p>
      <p className="desc">{task.desc}</p>
      <div className="icons">
        <FaTrash
          className="trash"
          onClick={() => dispatch(deleteTask(task._id))}
        />
        <FaPencilAlt className="pen" onClick={() => editTask(task._id)} />
      </div>
    </div>
  );
}

export default Task;
