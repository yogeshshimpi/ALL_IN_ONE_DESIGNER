"use client";
import "./landing_page.css";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/app/assets/logo black.png";
import menu from "@/app/assets/menu.svg";
import arrow_for_white from "@/app/assets/arrow_forward_white.svg"
import arrow_for from "@/app/assets/arrow_forward.svg"
import dwo from "@/app/assets/design-with-friend.png"

export default function Home() {
    const [dropDown,setDropDown] = useState(false)
    const [width,setWidth] = useState(window.innerWidth)
    const[btn_2_clone,setbtn_2_clone] = useState(false)
    const array_tool = ["Word","PPT","Excel","Website","Resume Maker","Poster Maker"]
    const [toolImage,setToolImage] = useState("Word")

    useEffect(()=>{
      const handleResize= ()=>{
        setWidth(window.innerWidth)
      }

      window.addEventListener('resize',handleResize)
      return(()=>{
        window.removeEventListener('resize',handleResize)
        
      })
    },[])
    const handleToolImage = (e) =>{
      setToolImage(array_tool[e])
    }
    const handlebtn2Clone = () =>{
      setbtn_2_clone(true)
      setTimeout(() => {
        setbtn_2_clone(false)
      }, 1000);
    }

    const handleDropDown = () =>{
      setDropDown(!dropDown)
    }

  return (
    <main>
      <section className="hero">
          <section className="sec">
          <nav>
          <div className="logo-side">
            <Image src={logo} className="image" alt="" />
            <div className="text">All In One Designer</div>
          </div>
          {
            width <= 650 ? ( 
              <div className="nav-btn-sec">
                <button className="nav-btn" onClick={handleDropDown}>
                 <Image src={menu} alt=""/>
               
              </button>  
              <ul style={{opacity: dropDown? '100%':'0',transitionDuration:'0.3s'}}>
                  <li>product</li>
                  <li>product</li>
                  <li>product</li>
                  <li>product</li>
                 </ul>
              </div>
            ) : (
             <ul className="navigation">
            <li>
              Product
              <span></span>
            </li>
            <li>
              Tutorial
              <span></span>
            </li>
            <li>
              About
              <span></span>
            </li>
            <li>
              Contact Us
              <span></span>
            </li>
          </ul>)
          }
         
          <div className="log-in-btn">
            <button className="btn-1">Log In</button>
          </div>
        </nav>
        <section className="welcome-sec">
          <div className="text-1">Welcome to</div>
          <div className="text-2">All In One Designer</div>
          <div className="text-3">Create Smarter, Innovate Faster !</div>
          <button className="get-started" onClick={handlebtn2Clone}>
            <div className="btn-1">Get Started</div>
            <div className="btn-2">
              <Image  src={arrow_for_white} width={20} className={btn_2_clone?"image-2":""} alt=""/>
            </div>
          </button>
        </section>
        <section className="tool-sec">
          <div className="left-side">{toolImage}</div>
          <div className="right-side">
            <button className="btn0" onClick={()=>{handleToolImage(0)}}>Word</button>
            <button className="btn1" onClick={()=>{handleToolImage(1)}}>PPT</button>
            <button className="btn2" onClick={()=>{handleToolImage(2)}}>Excel</button>
            <button className="btn3" onClick={()=>{handleToolImage(3)}}>Website</button>
            <button className="btn4" onClick={()=>{handleToolImage(4)}}>Resume Maker</button>
            <button className="btn5" onClick={()=>{handleToolImage(5)}}>Poster Maker</button>
          </div>
        </section>
        <section className="dwo">
          <Image className="dwo-image" src={dwo} alt=""/>
          <div className="dwo-text">
            <div className="heading">
            Design With Other
            </div>
            <div className="paragraph">
            Invite friends and family member to design with you set your
            whole team to work together.
            </div>
          </div>
        </section>
      
        <section className="get-started-sec">
          <div className="text">Start Design with All In One Designer</div>
          
          <button className="get-started" onClick={handlebtn2Clone}>
            <div className="btn-1">Get Started</div>
            <div className="btn-2">
              <Image  src={arrow_for} width={20} className={btn_2_clone?"image-2":""} alt=""/>
            </div>
          </button>
        </section>
      
          </section>
          
        </section>
    </main>
  );
}
