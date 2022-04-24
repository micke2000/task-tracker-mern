import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import Loading from "../components/Loading";
import { getTasks, taskReset, updateTask } from "../features/tasks/taskSlice";
function EditTask() {
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );
  const { id: taskId } = useParams();
  const [formErrors, setErrors] = useState({
    submited: false,
  });
  const [task, setTask] = useState({
    name: "",
    desc: "",
    deadline: "",
  });
  const dispatch = useDispatch();
  const back = () => {
    navigate("/");
  };
  const validateForm = (values) => {
    let errors = { submited: true };

    if (values.name.length === 0) {
      errors.name = "Name is reqired!";
    }
    setErrors(errors);
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    validateForm(task);
  };
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getTasks());
    setTask({
      name: tasks.find((task) => task._id === taskId).name,
      desc: tasks.find((task) => task._id === taskId).desc,
      deadline: tasks.find((task) => task._id === taskId).deadline,
    });
    if (!formErrors.name && formErrors.submited) {
      const taskWithId = { task, id: taskId };
      dispatch(updateTask(taskWithId));
      setTask({
        name: "",
        desc: "",
        deadline: "",
      });
      navigate("/");
    }
  }, [user, navigate, dispatch, formErrors]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {/* {console.log(taskId, tasks)} */}
      <div className="center_box normal">
        <div className="top gradient">
          <button type="submit" className="btn_light back" onClick={back}>
            <FaArrowDown className="arrow" /> Back
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <h2>Edit task</h2>
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
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default EditTask;
