import React, { useRef, useState } from "react";
import "./sign-up.css";
import visibility from "../assets/visibility.svg";
import visibility_off from "../assets/visibility_off.svg";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import  ReverseTimer from '../Reversetimer/ReverseTimer';

const Sign_up = () => {
  const naviagte = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const length = otp.length;
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const [EyePassword, setEyePassword] = useState(false);
  const [EyeConfirm, setEyeConfirm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [o, seto] = useState(null);
  const inputRefs = useRef([]);
  const [timer,setTimer] = useState(0)

  const password = watch("password");

  const handleInputType = (e) => {
    if (e == 0) {
      setEyePassword(!EyePassword);
    } else {
      setEyeConfirm(!EyeConfirm);
    }
  };

  const onSubmit = async (data) => {
    const {name,email,password} = data
    const otp = o
    const a = await fetch("https://all-in-one-designer.vercel.app/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name,email,password,otp}),
      credentials:'include',
    });
    const result = await a.json();
    if (result.message) {
      naviagte('/sign-in')
    }else if(result.message === "server"){
      alert("The server was not responding")
    }else{
      setError('otp',{
        type:"maunal",
        message:"The otp is invalid"
      })
    }
  };

  const handleUserExist = async (value) => {
    const a = await fetch("https://all-in-one-designer.vercel.app/api/nameExist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: value }),
    });
    const result = await a.json();
    return result.message ? true : false;
  };
  const handleSubmitForm = async (value) => {
    if (value === "next") {
      const name = await trigger("name");
      const email = await trigger("email");
      const password = await trigger("password");
      const confirmPassword = await trigger("confirmPassword");

      if (name && email && password && confirmPassword) {
        // setSubmit(true);
        const data = { email: getValues("email") };
        const res = await fetch('https://all-in-one-designer.vercel.app/api/sendSignUpOtp',{
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify(data),
          credentials:'include',
        })
        const result = await res.json() 
        if(result.message){
        setSubmit(true);
        setTimer(300) 
        }
      }
    }
    if (value === "name") {
      await trigger("name");
    }
    if (value === "email") {
      await trigger("email");
    }
    if (value === "password") {
      await trigger("password");
    }
    if (value === "confirmPassword") {
      await trigger("confirmPassword");
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
      <section className="sign-up">
        <div className="heading">Sign Up</div>
        <div className="sub-heading">Create New Account</div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
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
                  {submit?(
                  <ReverseTimer initialTime={timer} />
                  ):(<span></span>)}
                </div>
              </div>
              <div></div>
            </div>
          ) : (
            <div className="form-validation">
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
                      message:
                        "Username should not contain any spaces",
                    },
                    validate: {
                      userExist: async (value) =>
                        (await handleUserExist(value)) ||
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
                  onKeyUp={() => {
                    handleSubmitForm("email");
                  }}
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.(com)$/i,
                      message: "Please enter valid email",
                    },
                  })}
                />
                <div className="error">
                  {errors.email && errors.email.message}
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
              <div className="confirm-password">
                <div className="password-field">
                  <input
                    type={EyeConfirm ? "password" : "text"}
                    onKeyUp={() => {
                      handleSubmitForm("confirmPassword");
                    }}
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
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
        <span className="or"></span>
        <div className="sign_in">
          <div>
            Don' t hava an account?{" "}
            <button>
              <Link to="/sign-in">Sign In</Link>
            </button>
          </div>
        </div>
      </section>
  );
};

export default Sign_up;
