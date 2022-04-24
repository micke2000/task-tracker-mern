import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { createTask } from "../features/tasks/taskSlice";
function TaskForm() {
  const { user } = useSelector((state) => state.auth);
  const [task, setTask] = useState({
    name: "",
    desc: "",
    deadline: new Date().toISOString().split("T")[0],
  });
  //Form validation
  const validateForm = (values) => {
    let errors = { submited: true };

    if (values.name.length === 0) {
      errors.name = "Name is reqired!";
    }
    setErrors(errors);
  };
  const [formErrors, setErrors] = useState({
    submited: false,
  });
  const dispatch = useDispatch();
  const back = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    validateForm(task);
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (!formErrors.name && formErrors.submited) {
      if (!formErrors.name) {
        dispatch(createTask(task));
        setTask({
          name: "",
          desc: "",
          deadline: "",
        });
        navigate("/");
      }
    }
  }, [user, navigate, formErrors]);
  return (
    <>
      <div className="center_box normal">
        <div className="top gradient">
          <button type="submit" className="btn_light back" onClick={back}>
            <FaArrowDown className="arrow" /> Back
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <h2>Add task</h2>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => {
                setTask({ ...task, name: e.target.value });
              }}
              value={task.name}
            />
          </label>
          {formErrors.name && <p className="error">{formErrors.name}</p>}
          <label htmlFor="desc">
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="10"
              placeholder="Task description"
              onChange={(e) => {
                setTask({ ...task, desc: e.target.value });
              }}
              value={task.desc}
            />
          </label>
          <label htmlFor="deadline" className="date">
            Task deadline:
            <input
              type="date"
              name="deadline"
              onChange={(e) => {
                setTask({ ...task, deadline: e.target.value });
              }}
              value={task.deadline}
            />
          </label>
          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
