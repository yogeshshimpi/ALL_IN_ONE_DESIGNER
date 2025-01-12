import { useState } from "react";
import  "./Sign_in.css";
import visibility from "../assets/visibility.svg";
import visibility_off from "../assets/visibility_off.svg";
import { useForm } from "react-hook-form";

const Sign_in = () => {
  const [EyePassword, setEyePassword] = useState(false);


  const handleInputType = () => {
    setEyePassword(!EyePassword);
  };
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors , isSubmitting },
  } = useForm();

  // const [invalid,setInvalid] = useState("")

  const onSubmit = async(data) => {
    const a = await fetch("http://localhost:3000/api/sign-in" , {
      method:'POST',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(data),
       credentials: 'include' 
    });
    const result = await a.json()
    if(result.message === "success"){
      window.location.href = "/home"
    }else if(result.message === "usernameInvalid"){
        setError('name',{
          message:"Username is not match",
        })
        clearErrors('password')
    }else if(result.message === "passwordInvalid"){
      setError('password',{
        message:"Pasword is not match",
      })
      clearErrors('name')
    }else{
      clearErrors('name')
      clearErrors('password')
    }
  };
  return (
    <section className="main">
      <section className="hero">
        <div className="heading">Sign In</div>
        <div className="sub-heading">Enter your credential to login</div>
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-sec">
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
              })}
            />
            <div className="error">{errors.name && errors.name.message}</div>
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
                  handleInputType();
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
          </div>
          <button disabled={isSubmitting} className="submit" type="submit">
            {isSubmitting ? <div className="loader"></div> : "submit"}
          </button>
        </form>
        <span className="or"></span>
        <div className="sign_in">
          <div>
            Don' t hava an account? <button><a href="/sign-up">Sign Up</a></button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Sign_in;
