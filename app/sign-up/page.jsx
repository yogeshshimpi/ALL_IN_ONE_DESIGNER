"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

import "@/app/sign-up/sign_up.css";
import visibility from "@/app/assets/visibility.svg";
import visibility_off from "@/app/assets/visibility_off.svg";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
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

  const onSubmit = (date) => {
    
  };

  return (
    <main>
      <section className="hero">
        <div className="heading">Sign Up</div>
        <div className="sub-heading">Create New Account</div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="username">
            <input
              type="text"
              placeholder="username"
              {...register("username", {
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
            <div className="error">
              {errors.username && errors.username.message}
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
                <Image
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
                <Image
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
          <button className="submit" type="submit">
            Create account
          </button>
        </form>
        <span className="or"></span>
        <div className="sign_in">
          <div>
            Already hava an account? <span>Sign In</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
