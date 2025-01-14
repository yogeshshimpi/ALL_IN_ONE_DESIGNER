import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Forgetpassword.css";
import visibility from "../assets/visibility.svg";
import visibility_off from "../assets/visibility_off.svg";
import arrow_back from '../assets/arrow_back.svg'
import { useForm } from "react-hook-form";

const Forgetpassword = () => {
  const [EyePassword, setEyePassword] = useState(false);
  const [EyeConfirm, setEyeConfirm] = useState(false);
  const username = useRef();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const length = otp.length;
  const [o, seto] = useState(null);
  const [otpBtn, setOtpBtn] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  
  const password = watch("password");
  const inputRefs = useRef([]);

  const handleInputType = (e) => {
    if (e == 0) {
      setEyePassword(!EyePassword);
    } else {
      setEyeConfirm(!EyeConfirm);
    }
  };

  useEffect(() => {
    if (username.current) {
      username.current.focus();
    }
  }, []);
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
  const onSubmit = async (data) => {
    if (data.button) {
      const name = data.name;
      const response = await fetch("http://localhost:3000/api/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({name}),
        credentials: 'include',
      });
      const result =  await response.json()
      if(result.message){
        setError("name",{type:"manual",message:"The username is doesn't exist"})
      }
      else{
        clearErrors("name.manual")
        alert("otp was send to your email")
        setOtpBtn(true)
        setTimeout(() => {
          setOtpBtn(false)
        }, 300000); 
      }
      if(result.server){
        alert("Problem is in server please try again later")
      }
    } else {
      
     
      const {name,password} = data
    const otp = o
    if (!o || o.length !== 6) {
      setError("otp", {
        type: "manual",
        message: "OTP must be exactly 6 digits long.",
      });
      return; // Prevent form submission if OTP is invalid
    }
    const response = await fetch("http://localhost:3000/api/verifiedOtp",{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({name,password,otp}),
      credentials: 'include',
    })
    const result = await response.json()
    if(result.message === "otpInvalid"){
      setError("otp",{type:"manual",message:"Please Enter the valid otp"})
    }else if(result.message === "nameInvalid"){
      setError("name",{type:"manual",message:"Please Enter valid username"})
    }
  }

    
  };

  const handleSendOtp = async () => {
    const isNameValid = await trigger("name");
    if (isNameValid) {
      const data = { name: getValues("name"), button: true };
      onSubmit(data);
    }
  };
  return (
    <section className="hero">
      <section className="main">
        <div className="heading">Forget Password</div>
        <div className="sub-heading">Change your password</div>
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
              })}
              ref={(e) => {
                register("name").ref(e);
                username.current = e;
              }}
            />
            <div className="error">{errors.name && errors.name.message}</div>
          </div>
            <button
              type="button"
              style={{backgroundColor:otpBtn?"rgba(255, 255, 255, 0.799)":"white"}}
              disabled={otpBtn}
              onClick={handleSendOtp}
              name="sendOtp"
              className="otp-send">
              Send OTP
            </button>
          <div className="otp">
            Enter OTP <div className="timer"></div>
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
            <div className="error">{errors.otp && errors.otp.message}</div>
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
          <button type="submit" name="verifiedOtp" className="submit">
            Submit
          </button>
        </form>
          <div className="go-back">
            <button><Link to='/sign-in'><img src={arrow_back} alt="" /></Link></button> Back to Sign In
          </div>
      </section>
    </section>
  );
};

export default Forgetpassword;
