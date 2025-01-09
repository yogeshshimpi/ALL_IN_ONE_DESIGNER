"use client"
import React, { useState } from "react";
import Image from "next/image";

import "@/app/sign-up/sign_up.css";
import visibility from '@/app/assets/visibility.svg'
import visibility_off from '@/app/assets/visibility_off.svg'

const page = () => {
  const [inputBorderPassword,setinputBorderPassword] = useState(false)
  const [inputBorderConfirm,setinputBorderConfirm] = useState(false)
  const [EyePassword,setEyePassword] = useState(false)
  const [EyeConfirm,setEyeConfirm] = useState(false)

  const handleBorderFocus = (e) =>{
    if(e == 0 ){
      setinputBorderPassword(true)
    }else{
      setinputBorderConfirm(true)
    }
  }
  const handleBorderBlur = (e) =>{
    if(e == 0 ){
      setinputBorderPassword(false)
    }else{
      setinputBorderConfirm(false)
    }
  }
  const handleInputType = (e) =>{
    if(e == 0 ){
      setEyePassword(!EyePassword)
    }else{
      setEyeConfirm(!EyeConfirm)
    }
  }
  return (
    <main>
      <section className="hero">
        <div className="heading">Sign Up</div>
        <div className="sub-heading">Create New Account</div>
        <form action="">
          <div className="username">
            <input type="text" placeholder="username" />
            <div className="error">error</div>
          </div>
          <div className="email">
            <input type="text" placeholder="Email" />
            <div className="error">error</div>
          </div>
          <div className="password">
            <div className="password-field" style={{borderColor:inputBorderPassword?"#7c7c7c":"transparent"}} >
              <input type={EyePassword?"password":"text"} onFocus={()=>{handleBorderFocus(0)}} onBlur={()=>{handleBorderBlur(0)}} placeholder="Password"/>
              <button className="pass" type="button" onClick={()=>{handleInputType(0)}}><Image src={EyePassword?visibility_off:visibility}  className="image" alt=""/></button>
            </div>
            <div className="error">error</div>
          </div>
          <div className="confirm-password">
            <div className="password-field" style={{borderColor:inputBorderConfirm?"#7c7c7c":"transparent"}}>
              <input type={EyeConfirm?"password":"text"} onFocus={()=>{handleBorderFocus(1)}} onBlur={()=>{handleBorderBlur(1)}} placeholder="Confirm password"/>
              <button className="pass" type="button" onClick={()=>{handleInputType(1)}}><Image src={EyeConfirm?visibility_off:visibility} className="image" alt=""/></button>
            </div>
            <div className="error">error</div>
          </div>
          <button className="submit" type="submit">Create account</button>
        </form>
        <span className="or"></span>
        <div className="sign_in">
          <div>Already hava an account? <span>Sign In</span></div>
        </div>
      </section>
    </main>
  );
};

export default page;
