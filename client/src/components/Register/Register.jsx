import "./register.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import server_api  from "../../server_api";

const Register = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      // console.log(data);
      const res = await server_api.post('/register',data);
      if (res) {
        // console.log(res);
        setSuccessMsg("User registration is successful ✔");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/");
        }, 2000);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form  className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required.",
            })}
          />
          {errors.username && (
            <p className="errorMsg">{errors.username.message}</p>
          )}
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  ),
              },
            })}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Register</button>
        </div>
        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>
    </div>
  );
};

export default Register;
