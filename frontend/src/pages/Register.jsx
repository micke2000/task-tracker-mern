import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Loading from "../components/Loading";
import "../index.css";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //Form validator
  const validateForm = (values) => {
    let errors = { submited: true };

    if (!values.name) {
      errors.name = "Name is reqired!";
    }
    if (!values.email) {
      errors.email = "Email is reqired!";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        values.email
      )
    ) {
      errors.email = "Email is invalid!";
    }
    if (!values.password) {
      errors.password = "Password is reqired!";
    } else if (values.password.length < 6) {
      errors.password = "Password needs to be over 6 characters!";
    }
    return errors;
  };
  const { name, email, password } = formData;
  const [errors, setErrors] = useState({ submited: false });
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
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(formData));
    if (!errors.name && !errors.email && !errors.password && errors.submited) {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  const signIn = () => {
    navigate("/login");
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
          <h2>Please create an account</h2>
          <label for="name">
            Name:
            <input
              type="text"
              name="name"
              placeholder="How we should call you"
              value={name}
              onChange={onChange}
            />
          </label>
          {errors.name && <p className="error">{errors.name}</p>}
          <label for="email">
            E-mail:
            <input
              type="text"
              name="email"
              placeholder="Your future login"
              value={email}
              onChange={onChange}
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
          <label for="password">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password to your account"
              value={password}
              onChange={onChange}
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <button type="submit" className="btn">
            Sign up
          </button>
          <label htmlFor="signin" className="small">
            Already have an account?
          </label>
          <button onClick={signIn} className="btn" name="signin">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
