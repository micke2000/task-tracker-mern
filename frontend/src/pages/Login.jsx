import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Loading from "../components/Loading";
import "../index.css";
function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [formErrors, setErrors] = useState({
    submited: false,
  });

  //Form validation
  const validateForm = (values) => {
    let errors = { submited: true };
    if (!values.email) {
      errors.email = "Email is reqired!";
    }
    if (!values.password) {
      errors.password = "Password is reqired!";
    }
    setErrors(errors);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const signUp = () => {
    navigate("/register");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    validateForm(formData);
    if (!formErrors.email && !formErrors.password && formErrors.submited) {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="center_box normal">
        <div className="top gradient">
          <p>Task Tracker</p>
        </div>
        <form onSubmit={onSubmit}>
          <h2>Log in to your account</h2>
          <label htmlFor="name">
            E-mail:
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
            />
          </label>
          {formErrors.email && <p className="error">{formErrors.email}</p>}
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
            />
          </label>
          {formErrors.password && (
            <p className="error">{formErrors.password}</p>
          )}
          <button type="submit" className="btn">
            Log in
          </button>
          <label htmlFor="signup" className="small">
            Don't have an account?
          </label>
          <button onClick={signUp} className="btn" name="signup">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
