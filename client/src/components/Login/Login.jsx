import React from "react";
import { useForm } from "react-hook-form";
import "./login.css";
import { useNavigate } from "react-router-dom";
import server_api  from "../../server_api";

const Login = ({setErrCode}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {
    try {
      // console.log(data);
      const res = await server_api.post('/login',data);
      if (res && res.data.username === "404") {
        // console.log(res);
        reset();
        setErrCode(404);
        navigate('/error');
      }
      else if(res && res.data.username === "unauthorized") {
        // console.log(res);
        reset();
        setErrCode(401);
        navigate('/error');
      }
      else if(res) {
        // console.log(res);
        reset();
        localStorage.setItem("user",res.data.username);
        navigate('/');  
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Username</label>
          <input type="text" name="username" {...register("username")} />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" name="password" {...register("password")} />
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
