import { useEffect } from "react";
import "../tasks.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Loading from "../components/Loading";
import { getTasks, taskReset } from "../features/tasks/taskSlice";
import Task from "../components/Task";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  const addTask = () => {
    navigate("/new");
  };
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getTasks());
    return () => {
      dispatch(taskReset());
    };
  }, [user, navigate, isError, message, dispatch]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="center_box dashboard">
        <div className="top gradient">
          <div className="text">
            <p>Hi,</p>
            <p className="name">{user ? user.name : ""}</p>
            <p>here are your tasks</p>
          </div>
          <button className="btn_light" onClick={onLogout}>
            Log out
          </button>
        </div>
        <div className="tasks">
          <button className="btn" onClick={addTask}>
            Add task
          </button>
          {tasks.length > 0 ? (
            <>
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </>
          ) : (
            <h2 className="no-tasks">No Tasks!</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
