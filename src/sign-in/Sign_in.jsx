import React, { useRef, useState } from "react";
import "./Sign_in.css";
import visibility from "../assets/visibility.svg";
import visibility_off from "../assets/visibility_off.svg";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
const ReverseTimer = React.lazy(() => import("../Reversetimer/Reversetimer"));

const Sign_in = () => {
  const [EyePassword, setEyePassword] = useState(true);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const length = otp.length;
  const handleInputType = () => {
    setEyePassword(!EyePassword);
  };
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submit, setSubmit] = useState(false);
  const [o, seto] = useState(null);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(0);

  const onSubmit = async (data) => {
    
    const {name,password} = data
    const otp = o
    console.log({name,password,otp})
    const a = await fetch("http://localhost:3000/api/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name,password,otp}),
      credentials: "include",
    });
    const result = await a.json();
    if(result.message === "success"){
      navigate('/home')
    }else if(result.message === "invalidOtp"){
      setError('otp',{
        type:"manual",
        message:"Otp is invalid"
      })
    }else{
      clearErrors('otp')
    }
  };

  const handleSubmitForm = async (value) => {
    if (value === "next") {
      const name = await trigger("name");
      const password = await trigger("password");
      if (name && password) {
        const data = {
          name: getValues("name"),
          password: getValues("password"),
        };
        const res = await fetch('http://localhost:3000/api/sendSignInOtp', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        });
        const result = await res.json();
        if (result.message === "success") {
          setSubmit(true);
        } else if (result.message === "usernameInvalid") {
          setError("name", {
            message: "Username is not match",
          });
          clearErrors("password");
        } else if (result.message === "passwordInvalid") {
          setError("password", {
            message: "Pasword is not match",
          });
          clearErrors("name");
        } else {
          clearErrors("name");
          clearErrors("password");
        }
      }
    }
    if (value === "name") {
      await trigger("name");
    }
    if (value === "password") {
      await trigger("password");
    }
    if (value === "back") {
      setSubmit(false);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    seto(newOtp.join(""));
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    if (isNaN(o)) {
      setError("otp", {
        type: "manual",
        message: "Please enter the valid otp ",
      });
    } else {
      clearErrors("otp");
    }
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  return (
      <section className="hero">
        <div className="heading">Sign In</div>
        <div className="sub-heading">Enter your credential to login</div>
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
          {submit ? (
            <div className="otp-validation">
              <div className="text">
                Enter 6-digit code sent to your email. This code is valid for
                the next 5 minutes
              </div>
              <div className="otpfield">
                <div className="otp-input">
                  {otp.map((value, index) => {
                    return (
                      <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(e) => {
                          handleChange(e, index);
                        }}
                        ref={(input) => (inputRefs.current[index] = input)}
                        onKeyDown={(e) => {
                          handleKeyDown(e, index);
                        }}
                        placeholder="0"
                      />
                    );
                  })}
                </div>
                <div className="resend-timer">
                  <span>Otp valid for 5 minute</span>
                  {submit ? (
                    <ReverseTimer initialTime={timer} />
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          ) : (
            <div className="input-sec">
              <div className="username">
                <input
                  type="text"
                  onKeyUp={() => {
                    handleSubmitForm("name");
                  }}
                  placeholder="username"
                  {...register("name", {
                    required: { value: true, message: "Username is required" },
                    minLength: {
                      value: 3,
                      message: "Minimum length is 3 ",
                    },
                    maxLength: {
                      value: 15,
                      message: "Maximum length is 15 ",
                    },
                    pattern: {
                      value: /^\S*$/,
                      message: "Username should not contain any spaces",
                    },
                  })}
                />
                <div className="error">
                  {errors.name && errors.name.message}
                </div>
              </div>
              <div className="password">
                <div className="password-field">
                  <input
                    type={EyePassword ? "password" : "text"}
                    onKeyUp={() => {
                      handleSubmitForm("password");
                    }}
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum length 3 required",
                      },
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
            </div>
          )}

          {submit ? (
            <div className="button">
              <button
                className="submit"
                type="button"
                onClick={() => {
                  handleSubmitForm("back");
                }}>
                Back
              </button>
              <button disabled={isSubmitting} className="submit" type="submit">
                {isSubmitting ? <div className="loader"></div> : "submit"}
              </button>
            </div>
          ) : (
            <button
              className="submit"
              onClick={() => {
                handleSubmitForm("next");
              }}
              type="button">
              Next
            </button>
          )}
        </form>
        <div className="forget">
          <Link to="/forgetpassword" className="Link">
            Forget password
          </Link>
        </div>
        <span className="or"></span>
        <div className="sign_in">
          <div>
            Don' t hava an account?{" "}
            <button>
              <Link to="/sign-up">Sign Up</Link>
            </button>
          </div>
        </div>
      </section>
  );
};

export default Sign_in;
