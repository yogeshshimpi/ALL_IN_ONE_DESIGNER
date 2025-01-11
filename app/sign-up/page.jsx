"use client";
import React, { useState } from "react";
import Image from "next/image";

import "@/app/sign-up/sign_up.css";
import visibility from "@/app/assets/visibility.svg";
import visibility_off from "@/app/assets/visibility_off.svg";
import { useForm } from "react-hook-form";

export default function Sign_up() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting },
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
    const a = await fetch("/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await a.json();
  };

  const handleUserExist = async (value) => {
    const res = await fetch("/api/usernameExist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({username:value})
    });
    const result = await res.json()
    return result.data ? true : false  
  };

  return (
    <main>
      <section className="hero">
        <div className="heading">Sign Up</div>
        <div className="sub-heading">Create New Account</div>
        <form action="" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {/* <input type="text" value={"yogesh4"} style={{display:'none'}} {...register("name",{        })} /> */}
          <div className="username">
            <input
              type="text"
              name="username"
              placeholder="username"
              {...register("name", {
                required: { value: true, message: "Username is required" },
                minLength: { value: 3, message: "Minimum length 3 required" },
                maxLength: { value: 15, message: "Maximum length 15 required" },
                pattern: {
                  value: /^\S+$/,
                  message: "Username cannot contain spaces",
                },
                validate: {
                  userExist: async (value) =>
                    (await handleUserExist(value)) ||
                    "The username is already taken",
                },
              })}
            />
            <div className="error">{errors.name && errors.name.message}</div>
          </div>
          <div className="email">
            <input
              name="email"
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
                name="password"
                placeholder="Password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: { value: 6, message: "Minimum length 6 required" },
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
          <button disabled={isSubmitting} className="submit" type="submit">
            {isSubmitting?<div className="loader"></div>:"submit"}
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
}

// export default page;
