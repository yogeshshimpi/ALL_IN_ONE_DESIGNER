import { useState} from "react";
import "./sign-up.css";
import visibility from "../assets/visibility.svg";
import visibility_off from "../assets/visibility_off.svg";
import { useForm } from "react-hook-form";
import { useNavigate ,Link } from "react-router-dom";

const Sign_up = () => {
  const naviagte = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting   },
  } = useForm();
  const [EyePassword, setEyePassword] = useState(false);
  const [EyeConfirm, setEyeConfirm] = useState(false);
  const password = watch("password");

  const handleInputType = (e) => {
    if (e == 0) {
      setEyePassword(!EyePassword);
    } else {
      setEyeConfirm(!EyeConfirm);
    }
  };

  const onSubmit = async (data) => {
    const a = await fetch("http://localhost:3000/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await a.json()
    if(result){
      naviagte('/sign-in')
    }
  };

  const handleUserExist = async (value)=>{
    const a = await fetch("http://localhost:3000/api/nameExist" , {
      method:'POST',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({name : value})
    });
    const result = await a.json()
    return result.message? true : false
  }

  return (
    <section className="main">
      <section className="sign-up">
        <div className="heading">Sign Up</div>
        <div className="sub-heading">Create New Account</div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="username">
            <input
              type="text"
              placeholder="username"
              {...register("name", {
                required: { value: true, message: "Username is required" },
                minLength: { value: 3, message: "Minimum length 3 required" },
                maxLength: { value: 15, message: "Maximum length 15 required" },
                pattern: {
                  value: /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/,
                  message:
                    "Username should contain special character and numeric value",
                },
                validate: {
                  userExist: async (value) =>
                    await handleUserExist(value) ||
                    "The username is already taken",
                },
              })}
            />
            <div className="error">
              {errors.name && errors.name.message}
            </div>
          </div>
          <div className="email">
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.(com)$/i,
                  message: "Please enter valid email",
                },
              })}
            />
            <div className="error">{errors.email && errors.email.message}</div>
          </div>
          <div className="password">
            <div className="password-field">
              <input
                type={EyePassword ? "password" : "text"}
                placeholder="Password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: { value: 3, message: "Minimum length 3 required" },
                  maxLength: {
                    value: 15,
                    message: "Maximum length 15 required",
                  },
                  pattern: {
                    value: /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/,
                    message:
                      "Password should contain special character and numeric value",
                  },
                })}
              />
              <button
                className="pass"
                type="button"
                onClick={() => {
                  handleInputType(0);
                }}>
                <img
                  src={EyePassword ? visibility_off : visibility}
                  className="image"
                  alt=""
                />
              </button>
            </div>
            <div className="error">
              {errors.password && errors.password.message}
            </div>
          </div>
          <div className="confirm-password">
            <div className="password-field">
              <input
                type={EyeConfirm ? "password" : "text"}
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: { value: true, message: "This field is required" },
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                className="pass"
                type="button"
                onClick={() => {
                  handleInputType(1);
                }}>
                <img
                  src={EyeConfirm ? visibility_off : visibility}
                  className="image"
                  alt=""
                />
              </button>
            </div>
            <div className="error">
            {errors.confirmPassword && errors.confirmPassword.message}
            </div>
          </div>
          <button disabled={isSubmitting} className="submit" type="submit">
          {isSubmitting?<div className="loader"></div>:"submit"}
          </button>
        </form>
        <span className="or"></span>
        <div className="sign_in">
          <div>
            Don' t hava an account? <button><Link to="/sign-in">Sign In</Link></button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Sign_up;
